/**
 * DoorFlow API Client Configuration
 *
 * Wraps the generated OpenAPI client with a simpler configuration interface.
 */

import { Configuration } from '../runtime';
import {
  AccountsApi,
  AdmissionRequestsApi,
  ChannelsApi,
  CredentialsApi,
  CredentialTypesApi,
  EventsApi,
  GroupReservationsApi,
  GroupsApi,
  NotificationRulesApi,
  OauthApi,
  PeopleApi,
  ReservationsApi,
  RolesApi,
  SitesApi,
  SyncApi,
} from '../apis';
import { createErrorFromResponse, DoorFlowError } from './errors';

/**
 * Options for initializing the DoorFlow client.
 */
export interface DoorFlowOptions {
  /** Your DoorFlow API key */
  apiKey: string;
  /** Base URL for the API (defaults to https://api.doorflow.com) */
  baseUrl?: string;
}

/**
 * Internal client that manages the connection to the DoorFlow API.
 */
export class ApiClient {
  private readonly configuration: Configuration;

  // Lazily initialized API instances
  private _accountsApi?: AccountsApi;
  private _admissionRequestsApi?: AdmissionRequestsApi;
  private _channelsApi?: ChannelsApi;
  private _credentialsApi?: CredentialsApi;
  private _credentialTypesApi?: CredentialTypesApi;
  private _eventsApi?: EventsApi;
  private _groupReservationsApi?: GroupReservationsApi;
  private _groupsApi?: GroupsApi;
  private _notificationRulesApi?: NotificationRulesApi;
  private _oauthApi?: OauthApi;
  private _peopleApi?: PeopleApi;
  private _reservationsApi?: ReservationsApi;
  private _rolesApi?: RolesApi;
  private _sitesApi?: SitesApi;
  private _syncApi?: SyncApi;

  constructor(options: DoorFlowOptions | string) {
    const opts = typeof options === 'string' ? { apiKey: options } : options;

    this.configuration = new Configuration({
      basePath: opts.baseUrl,
      accessToken: opts.apiKey,
    });
  }

  get accountsApi(): AccountsApi {
    if (!this._accountsApi) {
      this._accountsApi = new AccountsApi(this.configuration);
    }
    return this._accountsApi;
  }

  get admissionRequestsApi(): AdmissionRequestsApi {
    if (!this._admissionRequestsApi) {
      this._admissionRequestsApi = new AdmissionRequestsApi(this.configuration);
    }
    return this._admissionRequestsApi;
  }

  get channelsApi(): ChannelsApi {
    if (!this._channelsApi) {
      this._channelsApi = new ChannelsApi(this.configuration);
    }
    return this._channelsApi;
  }

  get credentialsApi(): CredentialsApi {
    if (!this._credentialsApi) {
      this._credentialsApi = new CredentialsApi(this.configuration);
    }
    return this._credentialsApi;
  }

  get credentialTypesApi(): CredentialTypesApi {
    if (!this._credentialTypesApi) {
      this._credentialTypesApi = new CredentialTypesApi(this.configuration);
    }
    return this._credentialTypesApi;
  }

  get eventsApi(): EventsApi {
    if (!this._eventsApi) {
      this._eventsApi = new EventsApi(this.configuration);
    }
    return this._eventsApi;
  }

  get groupReservationsApi(): GroupReservationsApi {
    if (!this._groupReservationsApi) {
      this._groupReservationsApi = new GroupReservationsApi(this.configuration);
    }
    return this._groupReservationsApi;
  }

  get groupsApi(): GroupsApi {
    if (!this._groupsApi) {
      this._groupsApi = new GroupsApi(this.configuration);
    }
    return this._groupsApi;
  }

  get notificationRulesApi(): NotificationRulesApi {
    if (!this._notificationRulesApi) {
      this._notificationRulesApi = new NotificationRulesApi(this.configuration);
    }
    return this._notificationRulesApi;
  }

  get oauthApi(): OauthApi {
    if (!this._oauthApi) {
      this._oauthApi = new OauthApi(this.configuration);
    }
    return this._oauthApi;
  }

  get peopleApi(): PeopleApi {
    if (!this._peopleApi) {
      this._peopleApi = new PeopleApi(this.configuration);
    }
    return this._peopleApi;
  }

  get reservationsApi(): ReservationsApi {
    if (!this._reservationsApi) {
      this._reservationsApi = new ReservationsApi(this.configuration);
    }
    return this._reservationsApi;
  }

  get rolesApi(): RolesApi {
    if (!this._rolesApi) {
      this._rolesApi = new RolesApi(this.configuration);
    }
    return this._rolesApi;
  }

  get sitesApi(): SitesApi {
    if (!this._sitesApi) {
      this._sitesApi = new SitesApi(this.configuration);
    }
    return this._sitesApi;
  }

  get syncApi(): SyncApi {
    if (!this._syncApi) {
      this._syncApi = new SyncApi(this.configuration);
    }
    return this._syncApi;
  }
}

/**
 * Wrap an API call with error handling.
 * Converts ResponseError to typed DoorFlowError.
 */
export async function withErrorHandling<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    if (error instanceof Error && 'response' in error) {
      const responseError = error as { response: Response };
      const response = responseError.response;

      let body: unknown;
      try {
        body = await response.json();
      } catch {
        body = await response.text();
      }

      const requestId = response.headers.get('x-request-id') ?? undefined;
      throw createErrorFromResponse(response.status, body, requestId);
    }

    if (error instanceof DoorFlowError) {
      throw error;
    }

    throw new DoorFlowError(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}
