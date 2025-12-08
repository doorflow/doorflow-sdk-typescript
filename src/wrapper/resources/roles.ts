/**
 * Roles Resource
 *
 * Access roles in DoorFlow. Roles define access permissions.
 */

import { Role } from '../../models';
import { Resource, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Roles resource for accessing roles.
 *
 * @example List all roles
 * ```typescript
 * for await (const role of doorflow.roles.list()) {
 *   console.log(role.name);
 * }
 * ```
 */
export class RolesResource extends Resource implements Listable<Role> {
  /**
   * List roles with pagination.
   */
  async list(options: ListOptions = {}): Promise<Page<Role>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const data = await this.execute(() => this.client.rolesApi.listRoles());
      return { data };
    };

    const result = await fetcher(options);
    return this.createList(result.data, options, fetcher);
  }
}
