import { Configuration } from '../../';
import { PaginationOptions } from '../type-guards';

/**
 * Base class for API resources
 */
export abstract class BaseResource<TApi> {
  protected api: TApi;

  constructor(
    protected config: Configuration,
    ApiClass: new (configuration?: Configuration) => TApi
  ) {
    this.api = new ApiClass(config);
  }

  /**
   * Helper to handle pagination
   */
  protected async *paginate<T>(
    fetchFn: (page: number, perPage: number) => Promise<T[]>,
    options: PaginationOptions = {}
  ): AsyncIterableIterator<T> {
    const { perPage = 100 } = options;
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const items = await fetchFn(page, perPage);
      
      if (items.length === 0) {
        hasMore = false;
      } else {
        yield* items;
        page++;
      }
      
      if (items.length < perPage) {
        hasMore = false;
      }
    }
  }

  /**
   * Retry logic for API calls
   */
  protected async withRetry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError: any;

    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
      }
    }

    throw lastError;
  }
}