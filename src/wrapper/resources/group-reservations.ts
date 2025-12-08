/**
 * Group Reservations Resource
 *
 * Manage group reservations in DoorFlow. Group reservations assign people
 * to groups for a limited time period.
 */

import { GroupReservation } from '../../models';
import { Resource, Creatable, Deletable, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Options for listing group reservations.
 */
export interface ListGroupReservationsOptions extends ListOptions {
  /** Return group reservations modified since this date */
  since?: Date;
}

/**
 * Input for creating a group reservation.
 */
export interface CreateGroupReservationInput {
  /** Person ID to assign to groups */
  personId: number;
  /** Start time */
  startTime: Date;
  /** End time */
  endTime: Date;
  /** Group IDs to assign the person to */
  groupIds: number[];
}

/**
 * Group reservations resource for managing temporary group membership.
 *
 * @example Create a group reservation
 * ```typescript
 * const reservation = await doorflow.groupReservations.create({
 *   personId: 123,
 *   groupIds: [10, 20],
 *   startTime: new Date('2024-01-01T09:00:00Z'),
 *   endTime: new Date('2024-01-01T17:00:00Z'),
 * });
 * ```
 */
export class GroupReservationsResource
  extends Resource
  implements
    Creatable<CreateGroupReservationInput, GroupReservation>,
    Deletable,
    Listable<GroupReservation, ListGroupReservationsOptions>
{
  /**
   * Create a new group reservation.
   */
  async create(data: CreateGroupReservationInput): Promise<GroupReservation> {
    return this.execute(() =>
      this.client.groupReservationsApi.createGroupReservation({
        groupReservationInput: {
          groupReservation: {
            personId: data.personId,
            startTime: data.startTime,
            endTime: data.endTime,
            groupIds: data.groupIds,
          },
        },
      })
    );
  }

  /**
   * Delete a group reservation.
   */
  async delete(id: number | string): Promise<void> {
    await this.execute(() =>
      this.client.groupReservationsApi.deleteGroupReservation({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * List group reservations with pagination.
   */
  async list(options: ListGroupReservationsOptions = {}): Promise<Page<GroupReservation>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const mergedOptions = { ...options, ...fetchOptions };
      const data = await this.execute(() =>
        this.client.groupReservationsApi.listGroupReservations({
          since: mergedOptions.since,
          perPage: mergedOptions.perPage,
          page: mergedOptions.page,
        })
      );
      return { data };
    };

    const result = await fetcher(options);
    return this.createList(result.data, options, fetcher);
  }
}
