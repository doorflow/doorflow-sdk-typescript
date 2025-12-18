/**
 * DoorFlow OAuth Client
 *
 * Provides a seamless OAuth 2.0 experience for DoorFlow API integration.
 * Handles the complete OAuth lifecycle including authorization, token exchange,
 * automatic refresh, and disconnection.
 *
 * @example
 * ```typescript
 * import { DoorFlowAuth, ITokenStorage } from '@doorflow/api';
 *
 * const auth = new DoorFlowAuth({
 *   clientId: process.env.DOORFLOW_CLIENT_ID!,
 *   clientSecret: process.env.DOORFLOW_CLIENT_SECRET,
 *   redirectUri: 'http://localhost:3000/callback',
 *   storage: myTokenStorage,
 * });
 *
 * // Generate authorization URL
 * const url = await auth.getAuthorizationUrl();
 *
 * // After callback, exchange code for tokens
 * await auth.handleCallback(code, state);
 *
 * // Get auto-refreshing Configuration for API clients
 * const config = auth.getConfiguration();
 * const peopleApi = new PeopleApi(config);
 * ```
 */

import { Configuration } from '../runtime';
import {
  OauthApi,
  GetAccessTokenGrantTypeEnum,
  AuthorizeOAuthResponseTypeEnum,
  AuthorizeOAuthCodeChallengeMethodEnum,
  RevokeTokenTokenTypeHintEnum,
} from '../apis/OauthApi';
import type { ITokenStorage, StoredTokens } from './ITokenStorage';
import { generateState, generateCodeVerifier, generateCodeChallenge } from './PKCEHelper';

/**
 * Configuration options for DoorFlowAuth.
 */
export interface DoorFlowAuthOptions {
  /** Your DoorFlow OAuth client ID */
  clientId: string;

  /** Your DoorFlow OAuth client secret (optional for PKCE/public clients) */
  clientSecret?: string;

  /** The redirect URI registered with your OAuth application */
  redirectUri: string;

  /** Token storage implementation */
  storage: ITokenStorage;

  /** Default OAuth scopes to request */
  scopes?: string[];

  /** Seconds before expiry to trigger refresh (default: 300 = 5 minutes) */
  refreshBufferSeconds?: number;

  /** DoorFlow API base URL (default: https://api.doorflow.com) */
  basePath?: string;
}

/**
 * Options for generating an authorization URL.
 */
export interface AuthorizationUrlOptions {
  /** Custom state parameter (auto-generated if not provided) */
  state?: string;

  /** Use PKCE for public clients (default: false, uses client_secret) */
  usePKCE?: boolean;

  /** Override default scopes for this request */
  scopes?: string[];
}

/**
 * Result of generating an authorization URL.
 */
export interface AuthorizationUrlResult {
  /** The full authorization URL to redirect users to */
  url: string;

  /** The state parameter (save this for validation in callback) */
  state: string;

  /** The PKCE code verifier (save this for token exchange if using PKCE) */
  codeVerifier?: string;
}

/**
 * DoorFlow OAuth 2.0 client with automatic token management.
 */
export class DoorFlowAuth {
  private options: Required<Omit<DoorFlowAuthOptions, 'clientSecret'>> & { clientSecret?: string };
  private oauthApi: OauthApi;

  // Stored for stateless callback handling (useful for single-server setups)
  private pendingState?: string;
  private pkceVerifier?: string;

  constructor(options: DoorFlowAuthOptions) {
    this.options = {
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      redirectUri: options.redirectUri,
      storage: options.storage,
      scopes: options.scopes || ['account.person', 'account.channel.readonly', 'account.event.access.readonly'],
      refreshBufferSeconds: options.refreshBufferSeconds ?? 300,
      basePath: options.basePath || 'https://api.doorflow.com',
    };

    // Create OauthApi without authentication (token endpoints use client credentials)
    this.oauthApi = new OauthApi(
      new Configuration({
        basePath: this.options.basePath,
      })
    );
  }

  /**
   * Generate an authorization URL to redirect users to.
   *
   * @param opts Options for customizing the authorization request
   * @returns The authorization URL and state (and code verifier if using PKCE)
   *
   * @example
   * ```typescript
   * // Server-side with client_secret
   * const { url, state } = await auth.getAuthorizationUrl();
   * // Store state in session/cookie for validation
   * res.redirect(url);
   *
   * // Browser-based with PKCE
   * const { url, state, codeVerifier } = await auth.getAuthorizationUrl({ usePKCE: true });
   * // Store state and codeVerifier in sessionStorage
   * window.location.href = url;
   * ```
   */
  async getAuthorizationUrl(opts?: AuthorizationUrlOptions): Promise<AuthorizationUrlResult> {
    const state = opts?.state || generateState();
    const scopes = opts?.scopes || this.options.scopes;

    // Build the authorization URL manually (the SDK's authorizeOAuth makes a request, we just need the URL)
    const params = new URLSearchParams();
    params.set('response_type', 'code');
    params.set('client_id', this.options.clientId);
    params.set('redirect_uri', this.options.redirectUri);
    params.set('scope', scopes.join(' '));
    params.set('state', state);

    let codeVerifier: string | undefined;

    if (opts?.usePKCE) {
      codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      params.set('code_challenge', codeChallenge);
      params.set('code_challenge_method', 'S256');

      // Store for stateless callback handling
      this.pkceVerifier = codeVerifier;
    }

    // Store state for stateless callback handling
    this.pendingState = state;

    // Use admin.doorflow.com for authorization (not api.doorflow.com)
    const authBaseUrl = this.options.basePath.replace('api.doorflow.com', 'admin.doorflow.com');
    const url = `${authBaseUrl}/oauth/authorize?${params.toString()}`;

    return { url, state, codeVerifier };
  }

  /**
   * Handle the OAuth callback and exchange the authorization code for tokens.
   *
   * @param code The authorization code from the callback URL
   * @param state The state parameter from the callback URL (for CSRF validation)
   * @param expectedState The state you stored before redirecting (optional if using stateless mode)
   * @param codeVerifier The PKCE code verifier (required if PKCE was used)
   * @returns The stored tokens
   * @throws Error if state validation fails or token exchange fails
   *
   * @example
   * ```typescript
   * // In your callback route
   * const code = searchParams.get('code');
   * const state = searchParams.get('state');
   * const expectedState = cookies.get('oauth_state');
   *
   * const tokens = await auth.handleCallback(code, state, expectedState);
   * ```
   */
  async handleCallback(
    code: string,
    state: string,
    expectedState?: string,
    codeVerifier?: string
  ): Promise<StoredTokens> {
    // Validate state parameter (CSRF protection)
    const validState = expectedState || this.pendingState;
    if (validState && state !== validState) {
      throw new Error('Invalid state parameter. Possible CSRF attack.');
    }

    // Use provided code verifier or stored one
    const verifier = codeVerifier || this.pkceVerifier;

    // Exchange code for tokens
    const response = await this.oauthApi.getAccessToken({
      grantType: GetAccessTokenGrantTypeEnum.AuthorizationCode,
      clientId: this.options.clientId,
      clientSecret: this.options.clientSecret,
      code,
      redirectUri: this.options.redirectUri,
      codeVerifier: verifier,
    });

    // Calculate expiration timestamp
    const tokens: StoredTokens = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken!,
      expiresAt: response.createdAt + response.expiresIn,
      scope: response.scope,
    };

    // Store tokens
    await this.options.storage.save(tokens);

    // Clear pending state/verifier
    this.pendingState = undefined;
    this.pkceVerifier = undefined;

    return tokens;
  }

  /**
   * Get a valid access token, automatically refreshing if needed.
   *
   * This is the main method for obtaining tokens. It handles:
   * - Checking if tokens exist
   * - Checking if the token is expired (with buffer)
   * - Automatically refreshing expired tokens
   * - Storing rotated refresh tokens
   *
   * @returns A valid access token
   * @throws Error if not authenticated or refresh fails
   */
  async getAccessToken(): Promise<string> {
    const tokens = await this.options.storage.load();

    if (!tokens) {
      throw new Error('Not authenticated. Please connect to DoorFlow first.');
    }

    // Check if token needs refresh (with buffer)
    const now = Math.floor(Date.now() / 1000);
    const needsRefresh = tokens.expiresAt - now < this.options.refreshBufferSeconds;

    if (needsRefresh) {
      const refreshed = await this.refreshAccessToken();
      return refreshed.accessToken;
    }

    return tokens.accessToken;
  }

  /**
   * Force a token refresh.
   *
   * Note: DoorFlow rotates refresh tokens on each use. The new refresh token
   * is automatically stored, and the old one becomes invalid.
   *
   * @returns The new tokens
   * @throws Error if not authenticated or refresh fails
   */
  async refreshAccessToken(): Promise<StoredTokens> {
    const tokens = await this.options.storage.load();

    if (!tokens) {
      throw new Error('Not authenticated. Please connect to DoorFlow first.');
    }

    try {
      const response = await this.oauthApi.getAccessToken({
        grantType: GetAccessTokenGrantTypeEnum.RefreshToken,
        clientId: this.options.clientId,
        clientSecret: this.options.clientSecret,
        refreshToken: tokens.refreshToken,
      });

      // CRITICAL: DoorFlow returns a NEW refresh token each time!
      // We must store it, or we lose the ability to refresh.
      const newTokens: StoredTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken!,
        expiresAt: response.createdAt + response.expiresIn,
        scope: response.scope || tokens.scope,
      };

      await this.options.storage.save(newTokens);

      return newTokens;
    } catch (error) {
      // If refresh fails, tokens are likely invalid - clear them
      await this.options.storage.clear();
      throw new Error(
        'Token refresh failed. Please reconnect to DoorFlow. ' +
          'This can happen if access was revoked or tokens expired.'
      );
    }
  }

  /**
   * Check if the user is authenticated (has stored tokens).
   *
   * Note: This only checks if tokens exist, not if they're valid.
   * Use getAccessToken() to ensure you have a valid token.
   */
  async isAuthenticated(): Promise<boolean> {
    const tokens = await this.options.storage.load();
    return tokens !== null;
  }

  /**
   * Get token metadata without refreshing.
   *
   * @returns Token info including expiration and scope, or null if not authenticated
   */
  async getTokenInfo(): Promise<{ expiresAt: number; scope?: string } | null> {
    const tokens = await this.options.storage.load();
    if (!tokens) {
      return null;
    }
    return {
      expiresAt: tokens.expiresAt,
      scope: tokens.scope,
    };
  }

  /**
   * Disconnect from DoorFlow by revoking tokens and clearing storage.
   *
   * This will:
   * 1. Revoke the refresh token on DoorFlow's servers (invalidates all associated access tokens)
   * 2. Clear local token storage
   *
   * Even if revocation fails (e.g., network error), local tokens are still cleared.
   */
  async disconnect(): Promise<void> {
    const tokens = await this.options.storage.load();

    if (tokens && this.options.clientSecret) {
      try {
        // Create Basic auth header for revocation
        const credentials = `${this.options.clientId}:${this.options.clientSecret}`;
        const encoded =
          typeof btoa === 'function'
            ? btoa(credentials)
            : Buffer.from(credentials).toString('base64');

        // Revoke the refresh token (this invalidates all associated access tokens)
        await this.oauthApi.revokeToken({
          authorization: `Basic ${encoded}`,
          token: tokens.refreshToken,
          tokenTypeHint: RevokeTokenTokenTypeHintEnum.RefreshToken,
        });
      } catch (error) {
        // Log but don't fail - we still want to clear local tokens
        console.error('[DoorFlowAuth] Failed to revoke token:', error);
      }
    }

    // Always clear local storage
    await this.options.storage.clear();
  }

  /**
   * Get a pre-configured SDK Configuration with automatic token refresh.
   *
   * Use this to create API clients that automatically handle authentication:
   *
   * @example
   * ```typescript
   * const config = auth.getConfiguration();
   * const peopleApi = new PeopleApi(config);
   * const people = await peopleApi.listPeople({});
   * ```
   */
  getConfiguration(): Configuration {
    return new Configuration({
      basePath: this.options.basePath,
      accessToken: async () => {
        const token = await this.getAccessToken();
        return `Bearer ${token}`;
      },
    });
  }
}
