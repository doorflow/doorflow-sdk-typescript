/**
 * Webhook Types
 *
 * TypeScript definitions for DoorFlow webhook payloads.
 */

/**
 * The action that triggered the webhook.
 */
export type WebhookAction = 'CREATE' | 'UPDATE' | 'DESTROY';

/**
 * The type of resource that was affected.
 */
export type WebhookResourceType =
  | 'Event'
  | 'PersonCredential'
  | 'PerimeterEvent'
  | string; // Allow other types for forward compatibility

/**
 * A parsed webhook event with camelCase properties.
 */
export interface WebhookEvent {
  /** The action that occurred: CREATE, UPDATE, or DESTROY */
  action: WebhookAction;

  /** Full URL to fetch the resource, includes ack_token */
  resource: string;

  /** The type of resource affected */
  resourceType: WebhookResourceType;

  /** The ID of the affected resource */
  resourceId: string;

  /** The DoorFlow account ID */
  accountId: string;

  /** Token to acknowledge receipt of this webhook */
  ackToken: string;
}

/**
 * Raw webhook event as received from DoorFlow (snake_case).
 */
export interface RawWebhookEvent {
  action: WebhookAction;
  resource: string;
  resource_type: string;
  resource_id: string;
  account_id: string;
  ack_token: string;
}

// ============ WebhookHandler Types ============

/**
 * Event pattern for handler registration.
 * Format: 'ResourceType.ACTION' (e.g., 'Event.CREATE')
 * Use '*' to handle all events.
 */
export type WebhookEventPattern =
  | 'Event.CREATE'
  | 'Event.UPDATE'
  | 'Event.DESTROY'
  | 'PersonCredential.CREATE'
  | 'PersonCredential.UPDATE'
  | 'PersonCredential.DESTROY'
  | 'PerimeterEvent.CREATE'
  | 'PerimeterEvent.UPDATE'
  | 'PerimeterEvent.DESTROY'
  | '*'
  | string; // Allow other patterns for forward compatibility

/**
 * Callback function for webhook event handlers.
 * Receives the webhook event and optionally the fetched resource.
 */
export type WebhookCallback<T = unknown> = (
  event: WebhookEvent,
  resource: T | undefined
) => void | Promise<void>;

/**
 * Options for WebhookHandler constructor.
 */
export interface WebhookHandlerOptions {
  /** Your webhook secret from DoorFlow */
  secret: string;
  /** Optional DoorFlow client for auto-fetching resources */
  doorflow?: import('../client/DoorFlow').DoorFlow;
}
