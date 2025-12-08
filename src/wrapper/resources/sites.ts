/**
 * Sites Resource
 *
 * Access sites in DoorFlow. Sites are physical locations.
 */

import { Site } from '../../models';
import { Resource, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Sites resource for accessing site information.
 *
 * @example List all sites
 * ```typescript
 * for await (const site of doorflow.sites.list()) {
 *   console.log(site.name, site.address);
 * }
 * ```
 */
export class SitesResource extends Resource implements Listable<Site> {
  /**
   * List sites with pagination.
   */
  async list(options: ListOptions = {}): Promise<Page<Site>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const data = await this.execute(() =>
        this.client.sitesApi.listSites({
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
