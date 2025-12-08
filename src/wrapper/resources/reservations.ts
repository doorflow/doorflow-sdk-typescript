/**
 * Reservations Resource
 *
 * Manage reservations in DoorFlow. Reservations provide time-limited
 * access for people to specific channels.
 */

import { Reservation } from '../../models';
import { Resource, Creatable, Deletable, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Options for listing reservations.
 */
export interface ListReservationsOptions extends ListOptions {
  /** Return reservations modified since this date */
  since?: Date;
}

/**
 * Input for creating a reservation.
 */
export interface CreateReservationInput {
  /** Person ID */
  personId: number;
  /** Channel IDs to grant access to */
  channelIds: number[];
  /** Start time */
  startTime: Date;
  /** End time */
  endTime: Date;
}

/**
 * Reservations resource for managing time-limited access.
 *
 * @example Create a reservation
 * ```typescript
 * const reservation = await doorflow.reservations.create({
 *   personId: 123,
 *   channelIds: [456, 789],
 *   startTime: new Date('2024-01-01T09:00:00Z'),
 *   endTime: new Date('2024-01-01T17:00:00Z'),
 * });
 * ```
 */
export class ReservationsResource
  extends Resource
  implements
    Creatable<CreateReservationInput, Reservation>,
    Deletable,
    Listable<Reservation, ListReservationsOptions>
{
  /**
   * Create a new reservation.
   */
  async create(data: CreateReservationInput): Promise<Reservation> {
    return this.execute(() =>
      this.client.reservationsApi.createReservation({
        reservationInput: {
          personId: data.personId,
          channelIds: data.channelIds,
          startTime: data.startTime,
          endTime: data.endTime,
        },
      })
    );
  }

  /**
   * Delete a reservation.
   */
  async delete(id: number | string): Promise<void> {
    await this.execute(() =>
      this.client.reservationsApi.deleteReservation({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * List reservations with pagination.
   */
  async list(options: ListReservationsOptions = {}): Promise<Page<Reservation>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const mergedOptions = { ...options, ...fetchOptions };
      const data = await this.execute(() =>
        this.client.reservationsApi.listReservations({
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
