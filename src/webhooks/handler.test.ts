import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebhookHandler } from './handler';
import { generateTestSignature } from './verify';
import type { WebhookEvent, RawWebhookEvent } from './types';

describe('WebhookHandler', () => {
  const secret = 'test-webhook-secret';
  const timestamp = '1712049196';

  const createPayload = (events: RawWebhookEvent[]): string => {
    return JSON.stringify(events);
  };

  const createHeaders = (payload: string) => ({
    signature: generateTestSignature(payload, timestamp, secret),
    timestamp,
  });

  const sampleEvent: RawWebhookEvent = {
    action: 'CREATE',
    resource: 'https://api.doorflow.com/api/3/events/98321?ack_token=abc123',
    resource_type: 'Event',
    resource_id: '98321',
    account_id: 'nbYfy7',
    ack_token: 'abc123',
  };

  describe('constructor', () => {
    it('requires a secret', () => {
      expect(() => {
        new WebhookHandler({ secret: '' });
      }).toThrow('WebhookHandler requires a secret');
    });

    it('creates handler with valid secret', () => {
      const handler = new WebhookHandler({ secret });
      expect(handler).toBeInstanceOf(WebhookHandler);
    });
  });

  describe('on()', () => {
    it('returns this for chaining', () => {
      const handler = new WebhookHandler({ secret });
      const result = handler.on('Event.CREATE', vi.fn());
      expect(result).toBe(handler);
    });

    it('allows chaining multiple handlers', () => {
      const handler = new WebhookHandler({ secret });
      handler
        .on('Event.CREATE', vi.fn())
        .on('Event.UPDATE', vi.fn())
        .on('*', vi.fn());
      // No error means success
    });
  });

  describe('handle()', () => {
    it('verifies signature and dispatches to handlers', async () => {
      const handler = new WebhookHandler({ secret });
      const callback = vi.fn();
      handler.on('Event.CREATE', callback);

      const payload = createPayload([sampleEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CREATE',
          resourceType: 'Event',
          resourceId: '98321',
        }),
        undefined // No doorflow client, so no resource fetched
      );
    });

    it('throws on invalid signature', async () => {
      const handler = new WebhookHandler({ secret });
      handler.on('Event.CREATE', vi.fn());

      const payload = createPayload([sampleEvent]);

      await expect(
        handler.handle(payload, { signature: 'invalid', timestamp })
      ).rejects.toThrow('Invalid webhook signature');
    });

    it('handles multiple events in one payload', async () => {
      const handler = new WebhookHandler({ secret });
      const createCallback = vi.fn();
      const updateCallback = vi.fn();

      handler.on('Event.CREATE', createCallback);
      handler.on('Event.UPDATE', updateCallback);

      const events: RawWebhookEvent[] = [
        { ...sampleEvent, action: 'CREATE' },
        { ...sampleEvent, action: 'UPDATE', resource_id: '98322' },
      ];
      const payload = createPayload(events);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(createCallback).toHaveBeenCalledTimes(1);
      expect(updateCallback).toHaveBeenCalledTimes(1);
    });

    it('handles object payload (parsed JSON)', async () => {
      const handler = new WebhookHandler({ secret });
      const callback = vi.fn();
      handler.on('Event.CREATE', callback);

      const events = [sampleEvent];
      const payload = createPayload(events);
      const headers = createHeaders(payload);

      // Pass as object instead of string
      await handler.handle(events, headers);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('handles array header values (some frameworks use arrays)', async () => {
      const handler = new WebhookHandler({ secret });
      const callback = vi.fn();
      handler.on('Event.CREATE', callback);

      const payload = createPayload([sampleEvent]);
      const sig = generateTestSignature(payload, timestamp, secret);

      // Some frameworks pass headers as arrays
      await handler.handle(payload, {
        signature: [sig] as unknown as string,
        timestamp: [timestamp] as unknown as string,
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('event dispatching', () => {
    it('dispatches to specific pattern handlers', async () => {
      const handler = new WebhookHandler({ secret });
      const createHandler = vi.fn();
      const updateHandler = vi.fn();
      const destroyHandler = vi.fn();

      handler
        .on('Event.CREATE', createHandler)
        .on('Event.UPDATE', updateHandler)
        .on('Event.DESTROY', destroyHandler);

      const payload = createPayload([sampleEvent]); // CREATE event
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(createHandler).toHaveBeenCalledTimes(1);
      expect(updateHandler).not.toHaveBeenCalled();
      expect(destroyHandler).not.toHaveBeenCalled();
    });

    it('dispatches to catch-all handler (*)', async () => {
      const handler = new WebhookHandler({ secret });
      const catchAllHandler = vi.fn();

      handler.on('*', catchAllHandler);

      const payload = createPayload([sampleEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(catchAllHandler).toHaveBeenCalledTimes(1);
    });

    it('calls both specific and catch-all handlers', async () => {
      const handler = new WebhookHandler({ secret });
      const specificHandler = vi.fn();
      const catchAllHandler = vi.fn();

      handler.on('Event.CREATE', specificHandler);
      handler.on('*', catchAllHandler);

      const payload = createPayload([sampleEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(specificHandler).toHaveBeenCalledTimes(1);
      expect(catchAllHandler).toHaveBeenCalledTimes(1);
    });

    it('calls multiple handlers for same pattern', async () => {
      const handler = new WebhookHandler({ secret });
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      handler.on('Event.CREATE', handler1);
      handler.on('Event.CREATE', handler2);

      const payload = createPayload([sampleEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    it('awaits async handlers', async () => {
      const handler = new WebhookHandler({ secret });
      const order: number[] = [];

      handler.on('Event.CREATE', async () => {
        await new Promise((r) => setTimeout(r, 10));
        order.push(1);
      });
      handler.on('Event.CREATE', async () => {
        order.push(2);
      });

      const payload = createPayload([sampleEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      // Handlers are called sequentially, so 1 should complete before 2 starts
      expect(order).toEqual([1, 2]);
    });

    it('handles PersonCredential events', async () => {
      const handler = new WebhookHandler({ secret });
      const callback = vi.fn();

      handler.on('PersonCredential.UPDATE', callback);

      const credentialEvent: RawWebhookEvent = {
        action: 'UPDATE',
        resource: 'https://api.doorflow.com/api/3/people/123/credentials/456?ack_token=xyz',
        resource_type: 'PersonCredential',
        resource_id: '456',
        account_id: 'nbYfy7',
        ack_token: 'xyz',
      };

      const payload = createPayload([credentialEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'UPDATE',
          resourceType: 'PersonCredential',
          resourceId: '456',
        }),
        undefined
      );
    });
  });

  describe('auto-fetch with DoorFlow client', () => {
    it('fetches Event resources when doorflow client provided', async () => {
      const mockEvent = { id: 98321, person: { name: 'John' }, channel: { name: 'Front Door' } };
      const mockDoorflow = {
        events: {
          getEvent: vi.fn().mockResolvedValue(mockEvent),
        },
      };

      const handler = new WebhookHandler({
        secret,
        doorflow: mockDoorflow as any,
      });

      const callback = vi.fn();
      handler.on('Event.CREATE', callback);

      const payload = createPayload([sampleEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(mockDoorflow.events.getEvent).toHaveBeenCalledWith({ id: 98321 });
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ resourceType: 'Event' }),
        mockEvent
      );
    });

    it('fetches PersonCredential resources parsing personId from URL', async () => {
      const mockCredential = { id: '456', cardNumber: '1234567890' };
      const mockDoorflow = {
        credentials: {
          getCredential: vi.fn().mockResolvedValue(mockCredential),
        },
      };

      const handler = new WebhookHandler({
        secret,
        doorflow: mockDoorflow as any,
      });

      const callback = vi.fn();
      handler.on('PersonCredential.UPDATE', callback);

      const credentialEvent: RawWebhookEvent = {
        action: 'UPDATE',
        resource: 'https://api.doorflow.com/api/3/people/123/credentials/456?ack_token=xyz',
        resource_type: 'PersonCredential',
        resource_id: '456',
        account_id: 'nbYfy7',
        ack_token: 'xyz',
      };

      const payload = createPayload([credentialEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(mockDoorflow.credentials.getCredential).toHaveBeenCalledWith({
        personId: 123,
        id: '456',
      });
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ resourceType: 'PersonCredential' }),
        mockCredential
      );
    });

    it('passes undefined when fetch fails', async () => {
      const mockDoorflow = {
        events: {
          getEvent: vi.fn().mockRejectedValue(new Error('Not found')),
        },
      };

      const handler = new WebhookHandler({
        secret,
        doorflow: mockDoorflow as any,
      });

      const callback = vi.fn();
      handler.on('Event.CREATE', callback);

      const payload = createPayload([sampleEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ resourceType: 'Event' }),
        undefined // Fetch failed, so undefined
      );
    });

    it('passes undefined for unknown resource types', async () => {
      const mockDoorflow = {
        events: { getEvent: vi.fn() },
        credentials: { getCredential: vi.fn() },
      };

      const handler = new WebhookHandler({
        secret,
        doorflow: mockDoorflow as any,
      });

      const callback = vi.fn();
      handler.on('*', callback);

      const unknownEvent: RawWebhookEvent = {
        action: 'CREATE',
        resource: 'https://api.doorflow.com/api/3/unknowns/123',
        resource_type: 'UnknownType',
        resource_id: '123',
        account_id: 'nbYfy7',
        ack_token: 'xyz',
      };

      const payload = createPayload([unknownEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(mockDoorflow.events.getEvent).not.toHaveBeenCalled();
      expect(mockDoorflow.credentials.getCredential).not.toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ resourceType: 'UnknownType' }),
        undefined
      );
    });

    it('passes undefined when PersonCredential URL cannot be parsed', async () => {
      const mockDoorflow = {
        credentials: {
          getCredential: vi.fn(),
        },
      };

      const handler = new WebhookHandler({
        secret,
        doorflow: mockDoorflow as any,
      });

      const callback = vi.fn();
      handler.on('PersonCredential.CREATE', callback);

      // Malformed URL without /people/{id}/ pattern
      const credentialEvent: RawWebhookEvent = {
        action: 'CREATE',
        resource: 'https://api.doorflow.com/api/3/credentials/456',
        resource_type: 'PersonCredential',
        resource_id: '456',
        account_id: 'nbYfy7',
        ack_token: 'xyz',
      };

      const payload = createPayload([credentialEvent]);
      const headers = createHeaders(payload);

      await handler.handle(payload, headers);

      expect(mockDoorflow.credentials.getCredential).not.toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ resourceType: 'PersonCredential' }),
        undefined
      );
    });
  });

  describe('DoorFlow.WebhookHandler static property', () => {
    it('is accessible from DoorFlow class', async () => {
      const { DoorFlow } = await import('../client/DoorFlow');

      expect(DoorFlow.WebhookHandler).toBe(WebhookHandler);

      const handler = new DoorFlow.WebhookHandler({ secret });
      expect(handler).toBeInstanceOf(WebhookHandler);
    });
  });
});
