/**
 * DoorFlow Unified Client
 *
 * Provides a simple interface to the DoorFlow API with all resources
 * available as properties. Requires completing OAuth authorization
 * separately via DoorFlowAuth.
 *
 * @example
 * ```typescript
 * import { DoorFlow, FileTokenStorage } from '@doorflow/api';
 *
 * const doorflow = new DoorFlow({
 *   clientId: process.env.DOORFLOW_CLIENT_ID!,
 *   clientSecret: process.env.DOORFLOW_CLIENT_SECRET,
 *   redirectUri: 'http://localhost:3000/callback',
 *   storage: new FileTokenStorage('./tokens.json'),
 * });
 *
 * // After OAuth authorization is complete...
 * const people = await doorflow.people.listPeople({});
 * ```
 */

import { DoorFlowAuth, DoorFlowAuthOptions } from '../auth';
import { Configuration } from '../runtime';
import {
  verifyWebhook,
  generateTestSignature,
  WebhookSignatureError,
  WebhookHandler,
} from '../webhooks';
import {
  AccountsApi,
  AdmissionRequestsApi,
  ChannelsApi,
  CredentialTypesApi,
  CredentialsApi,
  EventsApi,
  GroupReservationsApi,
  GroupsApi,
  NotificationRulesApi,
  PeopleApi,
  ReservationsApi,
  RolesApi,
  SitesApi,
  SyncApi,
} from '../apis';

export type DoorFlowOptions = DoorFlowAuthOptions;

export class DoorFlow {
  /**
   * Webhook utilities for verifying signatures.
   *
   * @example
   * ```typescript
   * app.post('/webhook', (req, res) => {
   *   try {
   *     const events = DoorFlow.webhooks.verify(
   *       req.body,
   *       req.headers['signature'],
   *       req.headers['timestamp'],
   *       process.env.DOORFLOW_WEBHOOK_SECRET!
   *     );
   *     // Process events...
   *     res.status(200).send();
   *   } catch (err) {
   *     res.status(401).send('Invalid webhook');
   *   }
   * });
   * ```
   */
  static webhooks = {
    /** Verify a webhook signature and parse the payload */
    verify: verifyWebhook,
    /** Generate a test signature for testing purposes */
    generateTestSignature,
    /** Error thrown when signature verification fails */
    SignatureError: WebhookSignatureError,
  };

  /**
   * WebhookHandler for event-based webhook handling with auto-fetch.
   *
   * @example
   * ```typescript
   * const webhooks = new DoorFlow.WebhookHandler({
   *   secret: process.env.DOORFLOW_WEBHOOK_SECRET!,
   *   doorflow, // optional: for auto-fetching resources
   * });
   *
   * webhooks.on('Event.CREATE', async (event, accessEvent) => {
   *   console.log('Access:', accessEvent?.person?.name);
   * });
   *
   * app.post('/webhook', async (req, res) => {
   *   await webhooks.handle(req.body, req.headers);
   *   res.status(200).send();
   * });
   * ```
   */
  static WebhookHandler = WebhookHandler;

  private auth: DoorFlowAuth;
  private _config?: Configuration;

  // Lazy-loaded API instances
  private _accounts?: AccountsApi;
  private _admissionRequests?: AdmissionRequestsApi;
  private _channels?: ChannelsApi;
  private _credentialTypes?: CredentialTypesApi;
  private _credentials?: CredentialsApi;
  private _events?: EventsApi;
  private _groupReservations?: GroupReservationsApi;
  private _groups?: GroupsApi;
  private _notificationRules?: NotificationRulesApi;
  private _people?: PeopleApi;
  private _reservations?: ReservationsApi;
  private _roles?: RolesApi;
  private _sites?: SitesApi;
  private _sync?: SyncApi;

  constructor(options: DoorFlowOptions) {
    this.auth = new DoorFlowAuth(options);
  }

  /**
   * Get the Configuration for API clients.
   * Includes automatic token refresh.
   */
  private get config(): Configuration {
    if (!this._config) {
      this._config = this.auth.getConfiguration();
    }
    return this._config;
  }

  // ============ API Resource Accessors ============

  /** Account management */
  get accounts(): AccountsApi {
    return (this._accounts ??= new AccountsApi(this.config));
  }

  /** Admission request status */
  get admissionRequests(): AdmissionRequestsApi {
    return (this._admissionRequests ??= new AdmissionRequestsApi(this.config));
  }

  /** Door controllers and access points */
  get channels(): ChannelsApi {
    return (this._channels ??= new ChannelsApi(this.config));
  }

  /** Credential type definitions */
  get credentialTypes(): CredentialTypesApi {
    return (this._credentialTypes ??= new CredentialTypesApi(this.config));
  }

  /** Access credentials (cards, fobs, PINs) */
  get credentials(): CredentialsApi {
    return (this._credentials ??= new CredentialsApi(this.config));
  }

  /** Access events and activity logs */
  get events(): EventsApi {
    return (this._events ??= new EventsApi(this.config));
  }

  /** Bulk group reservations */
  get groupReservations(): GroupReservationsApi {
    return (this._groupReservations ??= new GroupReservationsApi(this.config));
  }

  /** Access groups */
  get groups(): GroupsApi {
    return (this._groups ??= new GroupsApi(this.config));
  }

  /** Event notification rules */
  get notificationRules(): NotificationRulesApi {
    return (this._notificationRules ??= new NotificationRulesApi(this.config));
  }

  /** People management */
  get people(): PeopleApi {
    return (this._people ??= new PeopleApi(this.config));
  }

  /** Temporary access reservations */
  get reservations(): ReservationsApi {
    return (this._reservations ??= new ReservationsApi(this.config));
  }

  /** User roles */
  get roles(): RolesApi {
    return (this._roles ??= new RolesApi(this.config));
  }

  /** Sites and locations */
  get sites(): SitesApi {
    return (this._sites ??= new SitesApi(this.config));
  }

  /** Controller sync operations */
  get sync(): SyncApi {
    return (this._sync ??= new SyncApi(this.config));
  }

  // ============ Auth Methods ============

  /**
   * Check if the client has stored tokens.
   */
  async isAuthenticated(): Promise<boolean> {
    return this.auth.isAuthenticated();
  }

  /**
   * Get the authorization URL to start the OAuth flow.
   * Redirect users to this URL to authorize your application.
   */
  async getAuthorizationUrl(options?: { usePKCE?: boolean; scopes?: string[] }) {
    return this.auth.getAuthorizationUrl(options);
  }

  /**
   * Handle the OAuth callback after user authorization.
   * Call this with the code and state from the redirect URL.
   */
  async handleCallback(code: string, state: string, expectedState?: string, codeVerifier?: string) {
    return this.auth.handleCallback(code, state, expectedState, codeVerifier);
  }

  /**
   * Manually refresh the access token.
   * Note: Tokens are automatically refreshed before expiry, so you typically
   * don't need to call this directly.
   *
   * @returns The new tokens
   * @throws Error if not authenticated or refresh fails
   */
  async refreshAccessToken() {
    return this.auth.refreshAccessToken();
  }

  /**
   * Disconnect from DoorFlow.
   * Revokes tokens on the server and clears local storage.
   */
  async disconnect(): Promise<void> {
    await this.auth.disconnect();
    // Clear cached API instances
    this._config = undefined;
    this._accounts = undefined;
    this._admissionRequests = undefined;
    this._channels = undefined;
    this._credentialTypes = undefined;
    this._credentials = undefined;
    this._events = undefined;
    this._groupReservations = undefined;
    this._groups = undefined;
    this._notificationRules = undefined;
    this._people = undefined;
    this._reservations = undefined;
    this._roles = undefined;
    this._sites = undefined;
    this._sync = undefined;
  }
}
