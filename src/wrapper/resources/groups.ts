/**
 * Groups Resource
 *
 * Access groups in DoorFlow. Groups are collections of people.
 */

import { Group } from '../../models';
import { Resource, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Groups resource for accessing groups.
 *
 * @example List all groups
 * ```typescript
 * for await (const group of doorflow.groups.list()) {
 *   console.log(group.name);
 * }
 * ```
 */
export class GroupsResource extends Resource implements Listable<Group> {
  /**
   * List groups with pagination.
   */
  async list(options: ListOptions = {}): Promise<Page<Group>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const data = await this.execute(() => this.client.groupsApi.listGroups());
      return { data };
    };

    const result = await fetcher(options);
    return this.createList(result.data, options, fetcher);
  }
}
