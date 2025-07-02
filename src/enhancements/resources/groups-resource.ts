import { Configuration, GroupsApi, Group } from '../../';
import { BaseResource } from './base-resource';
import { PaginationOptions } from '../type-guards';

/**
 * Enhanced groups resource
 */
export class GroupsResource extends BaseResource<GroupsApi> {
  constructor(config: Configuration) {
    super(config, GroupsApi);
  }

  /**
   * Create a new group
   */
  async create(data: Partial<Group>): Promise<Group> {
    return this.api.createGroup({ group: data });
  }

  /**
   * Get a group by ID
   */
  async get(id: string): Promise<Group> {
    return this.api.getGroup({ id });
  }

  /**
   * Update a group
   */
  async update(id: string, data: Partial<Group>): Promise<Group> {
    return this.api.updateGroup({ id, group: data });
  }

  /**
   * Delete a group
   */
  async delete(id: string): Promise<void> {
    return this.api.deleteGroup({ id });
  }

  /**
   * List groups with pagination
   */
  async list(options: PaginationOptions = {}): Promise<Group[]> {
    const { page = 1, perPage = 50 } = options;
    return this.api.listGroups({ page, perPage });
  }

  /**
   * Add a member to the group
   */
  async addMember(groupId: string, personId: string): Promise<void> {
    // This would call the appropriate API endpoint
    return this.api.addGroupMember({ groupId, personId });
  }

  /**
   * Remove a member from the group
   */
  async removeMember(groupId: string, personId: string): Promise<void> {
    // This would call the appropriate API endpoint
    return this.api.removeGroupMember({ groupId, personId });
  }
}