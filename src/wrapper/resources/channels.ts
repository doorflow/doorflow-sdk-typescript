/**
 * Channels Resource
 *
 * Manage channels (doors/access points) in DoorFlow.
 */

import { Channel } from '../../models';
import { Resource, Retrievable, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Options for listing channels.
 */
export interface ListChannelsOptions extends ListOptions {
  /** Filter by site ID */
  siteId?: number;
}

/**
 * Options for unlocking a channel.
 */
export interface UnlockOptions {
  /** Time when door should automatically relock */
  relockAt?: Date;
}

/**
 * Options for locking down a channel.
 */
export interface LockdownOptions {
  /** Lock card access */
  cardLockdown?: boolean;
  /** Lock REX (request to exit) */
  rexLockdown?: boolean;
  /** Lock auxiliary input */
  auxLockdown?: boolean;
}

/**
 * Options for setting auto-unlock.
 */
export interface AutoUnlockOptions {
  /** Shift ID for auto-unlock schedule (null to disable) */
  shiftId?: number | null;
}

/**
 * Channels resource for managing doors and access points.
 *
 * @example List all channels
 * ```typescript
 * for await (const channel of doorflow.channels.list()) {
 *   console.log(channel.name);
 * }
 * ```
 *
 * @example Unlock a door
 * ```typescript
 * await doorflow.channels.unlock(123);
 * ```
 */
export class ChannelsResource
  extends Resource
  implements Retrievable<Channel>, Listable<Channel, ListChannelsOptions>
{
  /**
   * Retrieve a channel by ID.
   */
  async retrieve(id: number | string): Promise<Channel> {
    return this.execute(() =>
      this.client.channelsApi.getChannel({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * List channels with pagination.
   */
  async list(options: ListChannelsOptions = {}): Promise<Page<Channel>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const mergedOptions = { ...options, ...fetchOptions };
      const data = await this.execute(() =>
        this.client.channelsApi.listChannels({
          siteId: mergedOptions.siteId,
          perPage: mergedOptions.perPage,
          page: mergedOptions.page,
        })
      );
      return { data };
    };

    const result = await fetcher(options);
    return this.createList(result.data, options, fetcher);
  }

  /**
   * Unlock a channel (open a door).
   *
   * @param id - Channel ID
   * @param options - Unlock options
   * @returns The updated channel
   */
  async unlock(id: number | string, options: UnlockOptions = {}): Promise<Channel> {
    return this.execute(() =>
      this.client.channelsApi.unlockChannel({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
        unlockChannelRequest: options.relockAt ? { relockAt: options.relockAt } : undefined,
      })
    );
  }

  /**
   * Set a channel back to normal mode (locked state).
   *
   * @param id - Channel ID
   * @returns The updated channel
   */
  async lock(id: number | string): Promise<Channel> {
    return this.execute(() =>
      this.client.channelsApi.normalChannel({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * Put a channel into lockdown mode.
   *
   * @param id - Channel ID
   * @param options - Lockdown options
   * @returns The updated channel
   */
  async lockdown(id: number | string, options: LockdownOptions = {}): Promise<Channel> {
    return this.execute(() =>
      this.client.channelsApi.lockdownChannel({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
        lockdownChannelRequest: Object.keys(options).length > 0 ? {
          cardLockdown: options.cardLockdown,
          rexLockdown: options.rexLockdown,
          auxLockdown: options.auxLockdown,
        } : undefined,
      })
    );
  }

  /**
   * Remove lockdown from a channel.
   *
   * @param id - Channel ID
   * @returns The updated channel
   */
  async unlockdown(id: number | string): Promise<Channel> {
    return this.execute(() =>
      this.client.channelsApi.unlockdownChannel({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * Configure auto-unlock for a channel.
   *
   * @param id - Channel ID
   * @param options - Auto-unlock options (shiftId or null to disable)
   * @returns The updated channel
   */
  async setAutoUnlock(id: number | string, options: AutoUnlockOptions = {}): Promise<Channel> {
    return this.execute(() =>
      this.client.channelsApi.autoUnlockChannel({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
        autoUnlockChannelRequest: { shiftId: options.shiftId },
      })
    );
  }
}
