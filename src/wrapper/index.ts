/**
 * DoorFlow SDK - Idiomatic TypeScript Wrapper
 *
 * A Stripe-style wrapper for the DoorFlow API with full TypeScript support.
 *
 * @example Basic usage
 * ```typescript
 * import DoorFlow from '@doorflow/sdk';
 *
 * const doorflow = new DoorFlow('your_api_key');
 *
 * // Create a person
 * const person = await doorflow.people.create({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john@example.com',
 * });
 *
 * // List all people with auto-pagination
 * for await (const person of doorflow.people.list()) {
 *   console.log(person.email);
 * }
 *
 * // Unlock a door
 * await doorflow.channels.unlock(123);
 * ```
 *
 * @example Error handling
 * ```typescript
 * try {
 *   await doorflow.people.create({ firstName: 'John' });
 * } catch (e) {
 *   if (e instanceof DoorFlow.ValidationError) {
 *     console.log(e.errors);
 *   }
 * }
 * ```
 */

import { ApiClient, DoorFlowOptions } from './client';
import {
  AccountResource,
  ChannelsResource,
  CredentialsResource,
  CredentialTypesResource,
  EventsResource,
  GroupReservationsResource,
  GroupsResource,
  NotificationRulesResource,
  PeopleResource,
  ReservationsResource,
  RolesResource,
  SitesResource,
} from './resources';

// Re-export error classes
export {
  DoorFlowError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ApiError,
} from './errors';

// Re-export pagination types
export { Page, ListOptions } from './pagination';

// Re-export resource input types
export {
  ListPeopleOptions,
  CreatePersonInput,
  UpdatePersonInput,
} from './resources/people';
export {
  ListChannelsOptions,
  UnlockOptions,
  LockdownOptions,
} from './resources/channels';
export {
  ListCredentialsOptions,
  CreateCredentialInput,
  UpdateCredentialInput,
} from './resources/credentials';
export { ListEventsOptions } from './resources/events';
export {
  ListReservationsOptions,
  CreateReservationInput,
} from './resources/reservations';
export {
  ListGroupReservationsOptions,
  CreateGroupReservationInput,
} from './resources/group-reservations';
export {
  CreateNotificationRuleInput,
  UpdateNotificationRuleInput,
} from './resources/notification-rules';

/**
 * DoorFlow API Client
 *
 * The main entry point for interacting with the DoorFlow API.
 *
 * @example Initialize with API key
 * ```typescript
 * const doorflow = new DoorFlow('your_api_key');
 * ```
 *
 * @example Initialize with options
 * ```typescript
 * const doorflow = new DoorFlow({
 *   apiKey: 'your_api_key',
 *   baseUrl: 'https://api.doorflow.com',
 * });
 * ```
 */
class DoorFlow {
  private readonly client: ApiClient;

  // Lazily initialized resources
  private _account?: AccountResource;
  private _channels?: ChannelsResource;
  private _credentials?: CredentialsResource;
  private _credentialTypes?: CredentialTypesResource;
  private _events?: EventsResource;
  private _groupReservations?: GroupReservationsResource;
  private _groups?: GroupsResource;
  private _notificationRules?: NotificationRulesResource;
  private _people?: PeopleResource;
  private _reservations?: ReservationsResource;
  private _roles?: RolesResource;
  private _sites?: SitesResource;

  /**
   * Create a new DoorFlow client.
   *
   * @param options - API key string or configuration options
   */
  constructor(options: DoorFlowOptions | string) {
    this.client = new ApiClient(options);
  }

  /**
   * Account resource (singleton).
   */
  get account(): AccountResource {
    if (!this._account) {
      this._account = new AccountResource(this.client);
    }
    return this._account;
  }

  /**
   * Channels resource for managing doors and access points.
   */
  get channels(): ChannelsResource {
    if (!this._channels) {
      this._channels = new ChannelsResource(this.client);
    }
    return this._channels;
  }

  /**
   * Credentials resource for managing access credentials.
   */
  get credentials(): CredentialsResource {
    if (!this._credentials) {
      this._credentials = new CredentialsResource(this.client);
    }
    return this._credentials;
  }

  /**
   * Credential types resource.
   */
  get credentialTypes(): CredentialTypesResource {
    if (!this._credentialTypes) {
      this._credentialTypes = new CredentialTypesResource(this.client);
    }
    return this._credentialTypes;
  }

  /**
   * Events resource for accessing audit events.
   */
  get events(): EventsResource {
    if (!this._events) {
      this._events = new EventsResource(this.client);
    }
    return this._events;
  }

  /**
   * Group reservations resource.
   */
  get groupReservations(): GroupReservationsResource {
    if (!this._groupReservations) {
      this._groupReservations = new GroupReservationsResource(this.client);
    }
    return this._groupReservations;
  }

  /**
   * Groups resource.
   */
  get groups(): GroupsResource {
    if (!this._groups) {
      this._groups = new GroupsResource(this.client);
    }
    return this._groups;
  }

  /**
   * Notification rules resource.
   */
  get notificationRules(): NotificationRulesResource {
    if (!this._notificationRules) {
      this._notificationRules = new NotificationRulesResource(this.client);
    }
    return this._notificationRules;
  }

  /**
   * People resource for managing people.
   */
  get people(): PeopleResource {
    if (!this._people) {
      this._people = new PeopleResource(this.client);
    }
    return this._people;
  }

  /**
   * Reservations resource.
   */
  get reservations(): ReservationsResource {
    if (!this._reservations) {
      this._reservations = new ReservationsResource(this.client);
    }
    return this._reservations;
  }

  /**
   * Roles resource.
   */
  get roles(): RolesResource {
    if (!this._roles) {
      this._roles = new RolesResource(this.client);
    }
    return this._roles;
  }

  /**
   * Sites resource.
   */
  get sites(): SitesResource {
    if (!this._sites) {
      this._sites = new SitesResource(this.client);
    }
    return this._sites;
  }

}

// Attach error classes to DoorFlow for static access
import {
  DoorFlowError as _DoorFlowError,
  AuthenticationError as _AuthenticationError,
  ForbiddenError as _ForbiddenError,
  NotFoundError as _NotFoundError,
  ValidationError as _ValidationError,
  RateLimitError as _RateLimitError,
  ApiError as _ApiError,
} from './errors';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace DoorFlow {
  export const DoorFlowError = _DoorFlowError;
  export const AuthenticationError = _AuthenticationError;
  export const ForbiddenError = _ForbiddenError;
  export const NotFoundError = _NotFoundError;
  export const ValidationError = _ValidationError;
  export const RateLimitError = _RateLimitError;
  export const ApiError = _ApiError;
}

export default DoorFlow;
export { DoorFlow };
