/**
 * Credential Types Resource
 *
 * Access credential types in DoorFlow. Credential types define
 * the format and validation rules for credentials.
 */

import { CredentialType } from '../../models';
import { Resource, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Credential types resource for accessing credential type definitions.
 *
 * @example List all credential types
 * ```typescript
 * for await (const type of doorflow.credentialTypes.list()) {
 *   console.log(type.name);
 * }
 * ```
 */
export class CredentialTypesResource extends Resource implements Listable<CredentialType> {
  /**
   * List credential types with pagination.
   */
  async list(options: ListOptions = {}): Promise<Page<CredentialType>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const data = await this.execute(() =>
        this.client.credentialTypesApi.listCredentialTypes({
          perPage: fetchOptions.perPage,
          page: fetchOptions.page,
        })
      );
      return { data };
    };

    const result = await fetcher(options);
    return this.createList(result.data, options, fetcher);
  }
}
