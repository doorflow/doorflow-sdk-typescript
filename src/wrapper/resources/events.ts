/**
 * Events Resource
 *
 * Access events in DoorFlow. Events are audit log entries for
 * access control activities.
 */

import { Event } from '../../models';
import { Resource, Retrievable, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Options for listing events.
 */
export interface ListEventsOptions extends ListOptions {
  /** Return events since this date */
  since?: Date;
  /** Filter by event codes */
  eventCodes?: number[];
  /** Filter by first name */
  firstName?: string;
  /** Filter by last name */
  lastName?: string;
  /** Filter by channel IDs */
  channels?: number[];
  /** Filter by door controller IDs */
  doorControllers?: number[];
}

/**
 * Events resource for accessing audit events.
 *
 * @example List recent events
 * ```typescript
 * const yesterday = new Date(Date.now() - 86400000);
 * for await (const event of doorflow.events.list({ since: yesterday })) {
 *   console.log(event.eventType, event.createdAt);
 * }
 * ```
 */
export class EventsResource
  extends Resource
  implements Retrievable<Event>, Listable<Event, ListEventsOptions>
{
  /**
   * Retrieve an event by ID.
   */
  async retrieve(id: number | string): Promise<Event> {
    return this.execute(() =>
      this.client.eventsApi.getEvent({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * List events with pagination.
   */
  async list(options: ListEventsOptions = {}): Promise<Page<Event>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const mergedOptions = { ...options, ...fetchOptions };
      const data = await this.execute(() =>
        this.client.eventsApi.listEvents({
          since: mergedOptions.since,
          eventCodes: mergedOptions.eventCodes,
          firstName: mergedOptions.firstName,
          lastName: mergedOptions.lastName,
          channels: mergedOptions.channels,
          doorControllers: mergedOptions.doorControllers,
          n: mergedOptions.perPage,
          page: mergedOptions.page,
        })
      );
      return { data };
    };

    const result = await fetcher(options);
    return this.createList(result.data, options, fetcher);
  }
}
