import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DoorFlow } from './DoorFlow';
import type { ITokenStorage, StoredTokens } from '../auth/ITokenStorage';
import {
  PeopleApi,
  ChannelsApi,
  CredentialsApi,
  AccountsApi,
  EventsApi,
  GroupsApi,
} from '../apis';

// Mock storage implementation
function createMockStorage(initialTokens?: StoredTokens): ITokenStorage {
  let tokens: StoredTokens | null = initialTokens ?? null;
  return {
    load: vi.fn(async () => tokens),
    save: vi.fn(async (t: StoredTokens) => {
      tokens = t;
    }),
    clear: vi.fn(async () => {
      tokens = null;
    }),
  };
}

describe('DoorFlow', () => {
  const defaultOptions = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    redirectUri: 'http://localhost:3000/callback',
    storage: createMockStorage(),
  };

  describe('constructor', () => {
    it('creates an instance with valid options', () => {
      const doorflow = new DoorFlow(defaultOptions);
      expect(doorflow).toBeInstanceOf(DoorFlow);
    });

    it('works without clientSecret (for PKCE)', () => {
      const doorflow = new DoorFlow({
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:3000/callback',
        storage: createMockStorage(),
      });
      expect(doorflow).toBeInstanceOf(DoorFlow);
    });
  });

  describe('API accessors', () => {
    let doorflow: DoorFlow;

    beforeEach(() => {
      doorflow = new DoorFlow(defaultOptions);
    });

    it('returns PeopleApi from .people', () => {
      expect(doorflow.people).toBeInstanceOf(PeopleApi);
    });

    it('returns ChannelsApi from .channels', () => {
      expect(doorflow.channels).toBeInstanceOf(ChannelsApi);
    });

    it('returns CredentialsApi from .credentials', () => {
      expect(doorflow.credentials).toBeInstanceOf(CredentialsApi);
    });

    it('returns AccountsApi from .accounts', () => {
      expect(doorflow.accounts).toBeInstanceOf(AccountsApi);
    });

    it('returns EventsApi from .events', () => {
      expect(doorflow.events).toBeInstanceOf(EventsApi);
    });

    it('returns GroupsApi from .groups', () => {
      expect(doorflow.groups).toBeInstanceOf(GroupsApi);
    });

    it('returns the same instance on repeated access (lazy singleton)', () => {
      const people1 = doorflow.people;
      const people2 = doorflow.people;
      expect(people1).toBe(people2);
    });
  });

  describe('isAuthenticated', () => {
    it('returns false when no tokens are stored', async () => {
      const doorflow = new DoorFlow({
        ...defaultOptions,
        storage: createMockStorage(undefined),
      });
      expect(await doorflow.isAuthenticated()).toBe(false);
    });

    it('returns true when tokens are stored', async () => {
      const doorflow = new DoorFlow({
        ...defaultOptions,
        storage: createMockStorage({
          accessToken: 'test-access-token',
          refreshToken: 'test-refresh-token',
          expiresAt: Math.floor(Date.now() / 1000) + 3600,
        }),
      });
      expect(await doorflow.isAuthenticated()).toBe(true);
    });
  });

  describe('getAuthorizationUrl', () => {
    it('returns url and state', async () => {
      const doorflow = new DoorFlow(defaultOptions);
      const result = await doorflow.getAuthorizationUrl();

      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('state');
      expect(typeof result.url).toBe('string');
      expect(typeof result.state).toBe('string');
      expect(result.url).toContain('oauth/authorize');
      expect(result.url).toContain('client_id=test-client-id');
    });

    it('includes codeVerifier when usePKCE is true', async () => {
      const doorflow = new DoorFlow(defaultOptions);
      const result = await doorflow.getAuthorizationUrl({ usePKCE: true });

      expect(result).toHaveProperty('codeVerifier');
      expect(typeof result.codeVerifier).toBe('string');
      expect(result.url).toContain('code_challenge=');
    });
  });

  describe('refreshAccessToken', () => {
    it('throws when not authenticated', async () => {
      const doorflow = new DoorFlow({
        ...defaultOptions,
        storage: createMockStorage(undefined),
      });

      await expect(doorflow.refreshAccessToken()).rejects.toThrow(
        'Not authenticated'
      );
    });

    it('is exposed as a method on DoorFlow', () => {
      const doorflow = new DoorFlow(defaultOptions);
      expect(typeof doorflow.refreshAccessToken).toBe('function');
    });
  });

  describe('disconnect', () => {
    it('clears storage', async () => {
      const storage = createMockStorage({
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        expiresAt: Math.floor(Date.now() / 1000) + 3600,
      });
      const doorflow = new DoorFlow({
        ...defaultOptions,
        storage,
      });

      await doorflow.disconnect();

      expect(storage.clear).toHaveBeenCalled();
    });

    it('resets lazy-loaded API instances', async () => {
      const doorflow = new DoorFlow(defaultOptions);

      // Access an API to trigger lazy loading
      const peopleBefore = doorflow.people;

      await doorflow.disconnect();

      // After disconnect, accessing again should create a new instance
      const peopleAfter = doorflow.people;
      expect(peopleBefore).not.toBe(peopleAfter);
    });
  });
});
