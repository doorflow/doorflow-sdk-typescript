import { describe, it, expect } from 'vitest';
import {
  verifyWebhook,
  generateTestSignature,
  WebhookSignatureError,
} from './verify';
import type { RawWebhookEvent, WebhookEvent } from './types';

describe('verifyWebhook', () => {
  const secret = 'test-webhook-secret';
  const timestamp = '1712049196';

  const rawPayload: RawWebhookEvent[] = [
    {
      action: 'CREATE',
      resource: 'https://api.doorflow.com/api/3/events/98321?ack_token=abc123',
      resource_type: 'Event',
      resource_id: '98321',
      account_id: 'nbYfy7',
      ack_token: 'abc123',
    },
  ];

  const payloadString = JSON.stringify(rawPayload);
  const validSignature = generateTestSignature(payloadString, timestamp, secret);

  describe('valid signatures', () => {
    it('verifies a valid signature with string payload', () => {
      const events = verifyWebhook(payloadString, validSignature, timestamp, secret);

      expect(events).toHaveLength(1);
      expect(events[0].action).toBe('CREATE');
      expect(events[0].resourceType).toBe('Event');
      expect(events[0].resourceId).toBe('98321');
      expect(events[0].accountId).toBe('nbYfy7');
      expect(events[0].ackToken).toBe('abc123');
    });

    it('verifies a valid signature with object payload', () => {
      const events = verifyWebhook(rawPayload, validSignature, timestamp, secret);

      expect(events).toHaveLength(1);
      expect(events[0].action).toBe('CREATE');
    });

    it('handles multiple events in payload', () => {
      const multiPayload: RawWebhookEvent[] = [
        {
          action: 'CREATE',
          resource: 'https://api.doorflow.com/api/3/events/1',
          resource_type: 'Event',
          resource_id: '1',
          account_id: 'acc1',
          ack_token: 'token1',
        },
        {
          action: 'UPDATE',
          resource: 'https://api.doorflow.com/api/3/events/2',
          resource_type: 'PersonCredential',
          resource_id: '2',
          account_id: 'acc2',
          ack_token: 'token2',
        },
      ];

      const multiPayloadString = JSON.stringify(multiPayload);
      const signature = generateTestSignature(multiPayloadString, timestamp, secret);
      const events = verifyWebhook(multiPayloadString, signature, timestamp, secret);

      expect(events).toHaveLength(2);
      expect(events[0].action).toBe('CREATE');
      expect(events[1].action).toBe('UPDATE');
      expect(events[1].resourceType).toBe('PersonCredential');
    });
  });

  describe('invalid signatures', () => {
    it('throws WebhookSignatureError for invalid signature', () => {
      expect(() => {
        verifyWebhook(payloadString, 'invalid-signature', timestamp, secret);
      }).toThrow(WebhookSignatureError);
    });

    it('throws for tampered payload', () => {
      const tamperedPayload = JSON.stringify([{ ...rawPayload[0], action: 'DESTROY' }]);

      expect(() => {
        verifyWebhook(tamperedPayload, validSignature, timestamp, secret);
      }).toThrow(WebhookSignatureError);
    });

    it('throws for wrong secret', () => {
      expect(() => {
        verifyWebhook(payloadString, validSignature, timestamp, 'wrong-secret');
      }).toThrow(WebhookSignatureError);
    });

    it('throws for wrong timestamp', () => {
      expect(() => {
        verifyWebhook(payloadString, validSignature, '9999999999', secret);
      }).toThrow(WebhookSignatureError);
    });
  });

  describe('missing parameters', () => {
    it('throws for missing signature', () => {
      expect(() => {
        verifyWebhook(payloadString, undefined, timestamp, secret);
      }).toThrow('Missing webhook signature');
    });

    it('throws for missing timestamp', () => {
      expect(() => {
        verifyWebhook(payloadString, validSignature, undefined, secret);
      }).toThrow('Missing webhook timestamp');
    });

    it('throws for missing secret', () => {
      expect(() => {
        verifyWebhook(payloadString, validSignature, timestamp, '');
      }).toThrow('Missing webhook secret');
    });
  });

  describe('transforms snake_case to camelCase', () => {
    it('transforms all fields correctly', () => {
      const events = verifyWebhook(payloadString, validSignature, timestamp, secret);
      const event = events[0];

      // Verify camelCase properties exist
      expect(event).toHaveProperty('resourceType');
      expect(event).toHaveProperty('resourceId');
      expect(event).toHaveProperty('accountId');
      expect(event).toHaveProperty('ackToken');

      // Verify snake_case properties don't exist
      expect(event).not.toHaveProperty('resource_type');
      expect(event).not.toHaveProperty('resource_id');
      expect(event).not.toHaveProperty('account_id');
      expect(event).not.toHaveProperty('ack_token');
    });
  });
});

describe('generateTestSignature', () => {
  const secret = 'test-secret';
  const timestamp = '1234567890';

  it('generates consistent signatures', () => {
    const payload = { test: 'data' };
    const sig1 = generateTestSignature(payload, timestamp, secret);
    const sig2 = generateTestSignature(payload, timestamp, secret);

    expect(sig1).toBe(sig2);
  });

  it('generates different signatures for different payloads', () => {
    const sig1 = generateTestSignature({ a: 1 }, timestamp, secret);
    const sig2 = generateTestSignature({ a: 2 }, timestamp, secret);

    expect(sig1).not.toBe(sig2);
  });

  it('generates different signatures for different timestamps', () => {
    const payload = { test: 'data' };
    const sig1 = generateTestSignature(payload, '1111111111', secret);
    const sig2 = generateTestSignature(payload, '2222222222', secret);

    expect(sig1).not.toBe(sig2);
  });

  it('generates signatures that verify correctly', () => {
    const payload = [{ action: 'CREATE', resource_type: 'Event' }];
    const signature = generateTestSignature(payload, timestamp, secret);

    // This should not throw
    expect(() => {
      verifyWebhook(payload, signature, timestamp, secret);
    }).not.toThrow();
  });
});

describe('DoorFlow.webhooks static property', () => {
  it('is accessible from DoorFlow class', async () => {
    // Dynamic import to avoid circular dependency issues in tests
    const { DoorFlow } = await import('../client/DoorFlow');

    expect(DoorFlow.webhooks).toBeDefined();
    expect(DoorFlow.webhooks.verify).toBe(verifyWebhook);
    expect(DoorFlow.webhooks.generateTestSignature).toBe(generateTestSignature);
    expect(DoorFlow.webhooks.SignatureError).toBe(WebhookSignatureError);
  });
});
