/**
 * README Examples Sanity Check
 *
 * These tests verify that all code examples in the README actually work.
 * They test imports, types, method existence, and basic functionality.
 */

import { describe, it, expect, vi } from 'vitest';

describe('README Examples', () => {
  describe('Imports', () => {
    it('exports DoorFlow and FileTokenStorage', async () => {
      const { DoorFlow, FileTokenStorage } = await import('./index');

      expect(DoorFlow).toBeDefined();
      expect(FileTokenStorage).toBeDefined();
    });

    it('exports Person type', async () => {
      // TypeScript will fail compilation if this doesn't work
      const { DoorFlow, FileTokenStorage } = await import('./index');
      type Person = import('./index').Person;

      // Just verify we can reference the type
      const personArray: Person[] = [];
      expect(personArray).toEqual([]);
    });

    it('exports ITokenStorage and StoredTokens types', async () => {
      type ITokenStorage = import('./index').ITokenStorage;
      type StoredTokens = import('./index').StoredTokens;

      // Verify the interface shape
      const mockStorage: ITokenStorage = {
        async load() {
          return null;
        },
        async save(tokens: StoredTokens) {},
        async clear() {},
      };

      expect(mockStorage.load).toBeDefined();
      expect(mockStorage.save).toBeDefined();
      expect(mockStorage.clear).toBeDefined();
    });
  });

  describe('DoorFlow Client Creation', () => {
    it('creates client with required options', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      expect(doorflow).toBeInstanceOf(DoorFlow);
    });

    it('creates client without clientSecret (PKCE)', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        // No clientSecret - for PKCE/public clients
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      expect(doorflow).toBeInstanceOf(DoorFlow);
    });
  });

  describe('API Resource Accessors', () => {
    it('has all documented API accessors', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      // All documented accessors from README
      expect(doorflow.people).toBeDefined();
      expect(doorflow.channels).toBeDefined();
      expect(doorflow.credentials).toBeDefined();
      expect(doorflow.events).toBeDefined();
      expect(doorflow.groups).toBeDefined();
      expect(doorflow.reservations).toBeDefined();
      expect(doorflow.accounts).toBeDefined();
      expect(doorflow.admissionRequests).toBeDefined();
      expect(doorflow.credentialTypes).toBeDefined();
      expect(doorflow.groupReservations).toBeDefined();
      expect(doorflow.notificationRules).toBeDefined();
      expect(doorflow.roles).toBeDefined();
      expect(doorflow.sites).toBeDefined();
      expect(doorflow.sync).toBeDefined();
    });

    it('API accessors have expected methods', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      // Methods used in README examples
      expect(typeof doorflow.people.listPeople).toBe('function');
      expect(typeof doorflow.people.createPerson).toBe('function');
      expect(typeof doorflow.channels.listChannels).toBe('function');
      expect(typeof doorflow.channels.unlockChannel).toBe('function');
      expect(typeof doorflow.events.getEvent).toBe('function');
      expect(typeof doorflow.credentials.getCredential).toBe('function');
    });
  });

  describe('Auth Methods', () => {
    it('has isAuthenticated method', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      expect(typeof doorflow.isAuthenticated).toBe('function');

      // Should return false when no tokens
      const result = await doorflow.isAuthenticated();
      expect(result).toBe(false);
    });

    it('has getAuthorizationUrl method', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      const { url, state } = await doorflow.getAuthorizationUrl();

      expect(url).toContain('https://');
      expect(url).toContain('client_id=test-client-id');
      expect(state).toBeTruthy();
    });

    it('has getAuthorizationUrl with PKCE', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      const { url, state, codeVerifier } = await doorflow.getAuthorizationUrl({
        usePKCE: true,
      });

      expect(url).toContain('code_challenge=');
      expect(state).toBeTruthy();
      expect(codeVerifier).toBeTruthy();
    });

    it('has handleCallback method', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      expect(typeof doorflow.handleCallback).toBe('function');
    });

    it('has disconnect method', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      expect(typeof doorflow.disconnect).toBe('function');
    });
  });

  describe('FileTokenStorage', () => {
    it('can be instantiated with a path', async () => {
      const { FileTokenStorage } = await import('./index');

      const storage = new FileTokenStorage('./tokens.json');

      expect(storage).toBeDefined();
      expect(typeof storage.load).toBe('function');
      expect(typeof storage.save).toBe('function');
      expect(typeof storage.clear).toBe('function');
    });
  });

  describe('DoorFlow.webhooks Static Property', () => {
    it('has verify method', async () => {
      const { DoorFlow } = await import('./index');

      expect(DoorFlow.webhooks).toBeDefined();
      expect(typeof DoorFlow.webhooks.verify).toBe('function');
    });

    it('has generateTestSignature method', async () => {
      const { DoorFlow } = await import('./index');

      expect(typeof DoorFlow.webhooks.generateTestSignature).toBe('function');
    });

    it('has SignatureError', async () => {
      const { DoorFlow } = await import('./index');

      expect(DoorFlow.webhooks.SignatureError).toBeDefined();
    });

    it('verify and generateTestSignature work together', async () => {
      const { DoorFlow } = await import('./index');

      const payload = [{ action: 'CREATE', resource_type: 'Event', resource_id: '123', account_id: 'acc', ack_token: 'tok', resource: 'http://example.com' }];
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const secret = 'test-secret';

      const signature = DoorFlow.webhooks.generateTestSignature(payload, timestamp, secret);
      const events = DoorFlow.webhooks.verify(payload, signature, timestamp, secret);

      expect(events).toHaveLength(1);
      expect(events[0].action).toBe('CREATE');
      expect(events[0].resourceType).toBe('Event');
    });
  });

  describe('DoorFlow.WebhookHandler', () => {
    it('is accessible as static property', async () => {
      const { DoorFlow } = await import('./index');

      expect(DoorFlow.WebhookHandler).toBeDefined();
    });

    it('can be instantiated with secret', async () => {
      const { DoorFlow } = await import('./index');

      const webhooks = new DoorFlow.WebhookHandler({
        secret: 'test-secret',
      });

      expect(webhooks).toBeDefined();
    });

    it('can be instantiated with doorflow client', async () => {
      const { DoorFlow } = await import('./index');

      const mockStorage = {
        load: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue(undefined),
        clear: vi.fn().mockResolvedValue(undefined),
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: mockStorage,
      });

      const webhooks = new DoorFlow.WebhookHandler({
        secret: 'test-secret',
        doorflow,
      });

      expect(webhooks).toBeDefined();
    });

    it('has on method that returns this for chaining', async () => {
      const { DoorFlow } = await import('./index');

      const webhooks = new DoorFlow.WebhookHandler({
        secret: 'test-secret',
      });

      const result = webhooks
        .on('Event.CREATE', async (event, resource) => {})
        .on('PersonCredential.UPDATE', async (event, resource) => {})
        .on('*', async (event) => {});

      expect(result).toBe(webhooks);
    });

    it('has handle method', async () => {
      const { DoorFlow } = await import('./index');

      const webhooks = new DoorFlow.WebhookHandler({
        secret: 'test-secret',
      });

      expect(typeof webhooks.handle).toBe('function');
    });

    it('dispatches events to registered handlers', async () => {
      const { DoorFlow } = await import('./index');

      const webhooks = new DoorFlow.WebhookHandler({
        secret: 'test-secret',
      });

      const handler = vi.fn();
      webhooks.on('Event.CREATE', handler);

      const payload = [{
        action: 'CREATE',
        resource_type: 'Event',
        resource_id: '123',
        account_id: 'acc',
        ack_token: 'tok',
        resource: 'http://example.com',
      }];
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = DoorFlow.webhooks.generateTestSignature(payload, timestamp, 'test-secret');

      await webhooks.handle(payload, { signature, timestamp });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CREATE',
          resourceType: 'Event',
          resourceId: '123',
        }),
        undefined
      );
    });
  });

  describe('Custom ITokenStorage Implementation', () => {
    it('works with custom storage implementation', async () => {
      const { DoorFlow } = await import('./index');
      type ITokenStorage = import('./index').ITokenStorage;
      type StoredTokens = import('./index').StoredTokens;

      // Simulate database storage as shown in README
      const mockDb: Record<string, StoredTokens | undefined> = {};

      const dbStorage: ITokenStorage = {
        async load() {
          const row = mockDb['user-1'];
          if (!row) return null;
          return {
            accessToken: row.accessToken,
            refreshToken: row.refreshToken,
            expiresAt: row.expiresAt,
            scope: row.scope,
          };
        },
        async save(tokens: StoredTokens) {
          mockDb['user-1'] = tokens;
        },
        async clear() {
          delete mockDb['user-1'];
        },
      };

      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: dbStorage,
      });

      expect(doorflow).toBeInstanceOf(DoorFlow);

      // Verify storage methods work
      await dbStorage.save({
        accessToken: 'test-access',
        refreshToken: 'test-refresh',
        expiresAt: Date.now() / 1000 + 3600,
      });

      const loaded = await dbStorage.load();
      expect(loaded?.accessToken).toBe('test-access');

      await dbStorage.clear();
      const cleared = await dbStorage.load();
      expect(cleared).toBeNull();
    });
  });
});
