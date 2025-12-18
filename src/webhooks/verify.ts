/**
 * Webhook Signature Verification
 *
 * Verifies DoorFlow webhook signatures using HMAC-SHA256.
 *
 * @example
 * ```typescript
 * import { verifyWebhook } from '@doorflow/api';
 *
 * app.post('/webhook', (req, res) => {
 *   try {
 *     const events = verifyWebhook(
 *       req.body,
 *       req.headers['signature'],
 *       req.headers['timestamp'],
 *       process.env.DOORFLOW_WEBHOOK_SECRET!
 *     );
 *
 *     for (const event of events) {
 *       console.log(event.action, event.resourceType, event.resourceId);
 *     }
 *
 *     res.status(200).send();
 *   } catch (err) {
 *     res.status(401).send('Invalid webhook');
 *   }
 * });
 * ```
 */

import * as crypto from 'crypto';
import type { WebhookEvent, RawWebhookEvent } from './types';

/**
 * Error thrown when webhook signature verification fails.
 */
export class WebhookSignatureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WebhookSignatureError';
  }
}

/**
 * Verify a DoorFlow webhook signature and parse the payload.
 *
 * DoorFlow signs webhooks using HMAC-SHA256 with the format:
 * `HMAC-SHA256(timestamp.payload)`
 *
 * @param payload - The raw request body (string) or parsed JSON (object)
 * @param signature - The `Signature` header value
 * @param timestamp - The `Timestamp` header value
 * @param secret - Your webhook secret from DoorFlow
 * @returns Array of verified and parsed webhook events
 * @throws {WebhookSignatureError} If signature verification fails
 *
 * @example
 * ```typescript
 * // With Express (using raw body)
 * app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
 *   const events = verifyWebhook(
 *     req.body.toString(),
 *     req.headers['signature'],
 *     req.headers['timestamp'],
 *     secret
 *   );
 * });
 *
 * // With parsed JSON body
 * app.post('/webhook', express.json(), (req, res) => {
 *   const events = verifyWebhook(
 *     req.body,
 *     req.headers['signature'],
 *     req.headers['timestamp'],
 *     secret
 *   );
 * });
 * ```
 */
export function verifyWebhook(
  payload: string | object,
  signature: string | undefined,
  timestamp: string | undefined,
  secret: string
): WebhookEvent[] {
  if (!signature) {
    throw new WebhookSignatureError('Missing webhook signature');
  }

  if (!timestamp) {
    throw new WebhookSignatureError('Missing webhook timestamp');
  }

  if (!secret) {
    throw new WebhookSignatureError('Missing webhook secret');
  }

  // Serialize payload if it's an object
  const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);

  // Generate expected signature: HMAC-SHA256(timestamp.payload)
  const signatureData = `${timestamp}.${payloadString}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signatureData)
    .digest('hex');

  // Timing-safe comparison to prevent timing attacks
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    throw new WebhookSignatureError('Invalid webhook signature');
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    throw new WebhookSignatureError('Invalid webhook signature');
  }

  // Parse and transform the payload
  const rawEvents: RawWebhookEvent[] =
    typeof payload === 'string' ? JSON.parse(payload) : payload;

  // Ensure it's an array
  const eventsArray = Array.isArray(rawEvents) ? rawEvents : [rawEvents];

  // Transform snake_case to camelCase
  return eventsArray.map(transformEvent);
}

/**
 * Transform a raw webhook event (snake_case) to a WebhookEvent (camelCase).
 */
function transformEvent(raw: RawWebhookEvent): WebhookEvent {
  return {
    action: raw.action,
    resource: raw.resource,
    resourceType: raw.resource_type,
    resourceId: raw.resource_id,
    accountId: raw.account_id,
    ackToken: raw.ack_token,
  };
}

/**
 * Generate a test webhook signature for testing purposes.
 *
 * @param payload - The webhook payload (string or object)
 * @param timestamp - The timestamp to use
 * @param secret - The webhook secret
 * @returns The generated HMAC-SHA256 signature
 *
 * @example
 * ```typescript
 * const payload = [{ action: 'CREATE', resource_type: 'Event', ... }];
 * const timestamp = Math.floor(Date.now() / 1000).toString();
 * const signature = generateTestSignature(payload, timestamp, secret);
 *
 * // Use in tests
 * const events = verifyWebhook(payload, signature, timestamp, secret);
 * ```
 */
export function generateTestSignature(
  payload: string | object,
  timestamp: string,
  secret: string
): string {
  const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const signatureData = `${timestamp}.${payloadString}`;

  return crypto.createHmac('sha256', secret).update(signatureData).digest('hex');
}
