/**
 * WebhookHandler - Event-based webhook handling with auto-fetch
 *
 * Provides a declarative API for handling DoorFlow webhooks.
 *
 * @example
 * ```typescript
 * const webhooks = new DoorFlow.WebhookHandler({
 *   secret: process.env.DOORFLOW_WEBHOOK_SECRET!,
 *   doorflow, // optional: pass client to auto-fetch resources
 * });
 *
 * webhooks.on('Event.CREATE', async (event, accessEvent) => {
 *   console.log('Access:', accessEvent.person?.name);
 * });
 *
 * app.post('/webhook', async (req, res) => {
 *   await webhooks.handle(req.body, req.headers);
 *   res.status(200).send();
 * });
 * ```
 */

import type { DoorFlow } from '../client/DoorFlow';
import { verifyWebhook } from './verify';
import type {
  WebhookEvent,
  WebhookHandlerOptions,
  WebhookEventPattern,
  WebhookCallback,
} from './types';

export class WebhookHandler {
  private secret: string;
  private doorflow?: DoorFlow;
  private handlers: Map<string, WebhookCallback[]> = new Map();

  constructor(options: WebhookHandlerOptions) {
    if (!options.secret) {
      throw new Error('WebhookHandler requires a secret');
    }
    this.secret = options.secret;
    this.doorflow = options.doorflow;
  }

  /**
   * Register a handler for a webhook event pattern.
   *
   * @param pattern - Event pattern: 'ResourceType.ACTION' (e.g., 'Event.CREATE') or '*' for all events
   * @param callback - Handler function receiving (event, resource)
   * @returns this for chaining
   *
   * @example
   * ```typescript
   * webhooks
   *   .on('Event.CREATE', async (event, accessEvent) => {
   *     console.log('New access event:', accessEvent?.person?.name);
   *   })
   *   .on('PersonCredential.UPDATE', async (event, credential) => {
   *     console.log('Credential updated:', credential?.cardNumber);
   *   })
   *   .on('*', async (event) => {
   *     console.log('Any event:', event.resourceType, event.action);
   *   });
   * ```
   */
  on(pattern: WebhookEventPattern, callback: WebhookCallback): this {
    const existing = this.handlers.get(pattern) || [];
    existing.push(callback);
    this.handlers.set(pattern, existing);
    return this;
  }

  /**
   * Handle an incoming webhook request.
   *
   * Verifies the signature, parses events, optionally fetches resources,
   * and dispatches to registered handlers.
   *
   * @param body - Request body (string or parsed JSON)
   * @param headers - Request headers containing signature and timestamp
   *
   * @example
   * ```typescript
   * // Express
   * app.post('/webhook', async (req, res) => {
   *   try {
   *     await webhooks.handle(req.body, req.headers);
   *     res.status(200).send();
   *   } catch (err) {
   *     res.status(401).send('Invalid webhook');
   *   }
   * });
   *
   * // Fastify
   * fastify.post('/webhook', async (request, reply) => {
   *   await webhooks.handle(request.body, request.headers);
   *   reply.status(200).send();
   * });
   *
   * // Next.js API Route
   * export async function POST(request: Request) {
   *   const body = await request.text();
   *   const headers = Object.fromEntries(request.headers);
   *   await webhooks.handle(body, headers);
   *   return new Response('OK');
   * }
   * ```
   */
  async handle(
    body: string | object,
    headers: { signature?: string; timestamp?: string; [key: string]: string | string[] | undefined }
  ): Promise<void> {
    // Normalize headers (handle array values)
    const signature = Array.isArray(headers.signature) ? headers.signature[0] : headers.signature;
    const timestamp = Array.isArray(headers.timestamp) ? headers.timestamp[0] : headers.timestamp;

    const events = verifyWebhook(body, signature, timestamp, this.secret);

    for (const event of events) {
      const resource = await this.fetchResource(event);
      await this.dispatchEvent(event, resource);
    }
  }

  /**
   * Fetch the full resource for an event.
   * Returns undefined if no client configured or fetch fails.
   */
  private async fetchResource(event: WebhookEvent): Promise<unknown | undefined> {
    if (!this.doorflow) return undefined;

    try {
      switch (event.resourceType) {
        case 'Event':
          return await this.doorflow.events.getEvent({
            id: Number(event.resourceId),
          });

        case 'PersonCredential': {
          // Parse personId from resource URL: /api/3/people/{personId}/credentials/{id}
          const match = event.resource.match(/\/people\/(\d+)\/credentials\//);
          if (!match) return undefined;
          return await this.doorflow.credentials.getCredential({
            personId: Number(match[1]),
            id: event.resourceId,
          });
        }

        default:
          // Unknown resource type - can't auto-fetch
          return undefined;
      }
    } catch {
      // Fetch failed (e.g., resource deleted, auth error) - return undefined
      return undefined;
    }
  }

  /**
   * Dispatch an event to all matching handlers.
   */
  private async dispatchEvent(event: WebhookEvent, resource: unknown): Promise<void> {
    const pattern = `${event.resourceType}.${event.action}`;

    // Call specific handlers for this pattern
    const specificHandlers = this.handlers.get(pattern) || [];
    for (const handler of specificHandlers) {
      await handler(event, resource);
    }

    // Call catch-all handlers
    const catchAllHandlers = this.handlers.get('*') || [];
    for (const handler of catchAllHandlers) {
      await handler(event, resource);
    }
  }
}
