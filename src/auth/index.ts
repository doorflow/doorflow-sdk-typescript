/**
 * DoorFlow OAuth Authentication Module
 *
 * Provides a seamless OAuth 2.0 experience for DoorFlow API integration.
 *
 * @example
 * ```typescript
 * import { DoorFlowAuth, ITokenStorage, StoredTokens } from '@doorflow/api';
 *
 * // Implement your token storage
 * const storage: ITokenStorage = {
 *   async load() { return JSON.parse(localStorage.getItem('tokens') || 'null'); },
 *   async save(tokens) { localStorage.setItem('tokens', JSON.stringify(tokens)); },
 *   async clear() { localStorage.removeItem('tokens'); },
 * };
 *
 * // Create auth client
 * const auth = new DoorFlowAuth({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret', // Optional for PKCE
 *   redirectUri: 'http://localhost:3000/callback',
 *   storage,
 * });
 *
 * // Use the auth client
 * const { url, state } = await auth.getAuthorizationUrl();
 * // ... user authorizes, callback receives code ...
 * await auth.handleCallback(code, state);
 * const config = auth.getConfiguration();
 * const peopleApi = new PeopleApi(config);
 * ```
 */

// Main OAuth client
export {
  DoorFlowAuth,
  type DoorFlowAuthOptions,
  type AuthorizationUrlOptions,
  type AuthorizationUrlResult,
} from './DoorFlowAuth';

// Token storage interface
export { type ITokenStorage, type StoredTokens } from './ITokenStorage';

// PKCE utilities (for custom implementations)
export { generateCodeVerifier, generateCodeChallenge, generateState } from './PKCEHelper';
