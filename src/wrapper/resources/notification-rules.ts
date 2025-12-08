/**
 * Notification Rules Resource
 *
 * Manage notification rules in DoorFlow. Rules define webhook callbacks
 * that trigger based on specific events.
 */

import { NotificationRule } from '../../models';
import { Resource, Creatable, Retrievable, Updatable, Deletable, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Input for creating a notification rule.
 */
export interface CreateNotificationRuleInput {
  /** Rule name */
  name: string;
  /** Whether the rule is active */
  active?: boolean;
  /** Webhook callback URL */
  callBackUrl: string;
  /** Event codes that trigger this rule */
  matchEventCodes: number[];
  /** Optional controller IDs to filter events */
  matchControllerIds?: number[];
}

/**
 * Input for updating a notification rule.
 */
export interface UpdateNotificationRuleInput {
  /** Rule name */
  name?: string;
  /** Whether the rule is active */
  active?: boolean;
  /** Webhook callback URL */
  callBackUrl?: string;
  /** Event codes that trigger this rule */
  matchEventCodes?: number[];
  /** Optional controller IDs to filter events */
  matchControllerIds?: number[];
}

/**
 * Notification rules resource for managing webhook callbacks.
 *
 * @example Create a notification rule
 * ```typescript
 * const rule = await doorflow.notificationRules.create({
 *   name: 'Access Denied Alert',
 *   active: true,
 *   callBackUrl: 'https://example.com/webhook',
 *   matchEventCodes: [1001, 1002],
 * });
 * ```
 */
export class NotificationRulesResource
  extends Resource
  implements
    Creatable<CreateNotificationRuleInput, NotificationRule>,
    Retrievable<NotificationRule>,
    Updatable<UpdateNotificationRuleInput, NotificationRule>,
    Deletable,
    Listable<NotificationRule>
{
  /**
   * Create a new notification rule.
   */
  async create(data: CreateNotificationRuleInput): Promise<NotificationRule> {
    return this.execute(() =>
      this.client.notificationRulesApi.createNotificationRule({
        notificationRuleInput: {
          name: data.name,
          active: data.active,
          callBackUrl: data.callBackUrl,
          matchEventCodes: data.matchEventCodes,
          matchControllerIds: data.matchControllerIds,
        },
      })
    );
  }

  /**
   * Retrieve a notification rule by ID.
   */
  async retrieve(id: number | string): Promise<NotificationRule> {
    return this.execute(() =>
      this.client.notificationRulesApi.getNotificationRule({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * Update a notification rule.
   */
  async update(id: number | string, data: UpdateNotificationRuleInput): Promise<NotificationRule> {
    return this.execute(() =>
      this.client.notificationRulesApi.updateNotificationRule({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
        notificationRuleInput: {
          name: data.name!,
          active: data.active,
          callBackUrl: data.callBackUrl!,
          matchEventCodes: data.matchEventCodes!,
          matchControllerIds: data.matchControllerIds,
        },
      })
    );
  }

  /**
   * Delete a notification rule.
   */
  async delete(id: number | string): Promise<void> {
    await this.execute(() =>
      this.client.notificationRulesApi.deleteNotificationRule({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * List all notification rules.
   *
   * Note: This endpoint returns all rules at once (no pagination).
   */
  async list(_options: ListOptions = {}): Promise<Page<NotificationRule>> {
    const data = await this.execute(() =>
      this.client.notificationRulesApi.listNotificationRules()
    );

    // No pagination on this endpoint - return all data in a single page
    return this.createList(data, { page: 1, perPage: data.length }, async () => ({ data: [] }));
  }
}
