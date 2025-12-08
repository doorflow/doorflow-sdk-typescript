/**
 * DoorFlow Pagination Support
 *
 * Provides async iterator support for automatic pagination.
 */

/**
 * Options for list operations.
 */
export interface ListOptions {
  /** Page number (1-based) */
  page?: number;
  /** Items per page */
  perPage?: number;
}

/**
 * Function type for fetching a page of results.
 */
export type PageFetcher<T> = (options: ListOptions) => Promise<{
  data: T[];
  total?: number;
}>;

/**
 * A page of results that supports async iteration for auto-pagination.
 *
 * @example Single page access
 * ```typescript
 * const page = await doorflow.people.list({ perPage: 50 });
 * console.log(page.data);
 * ```
 *
 * @example Auto-pagination with async iterator
 * ```typescript
 * for await (const person of doorflow.people.list()) {
 *   console.log(person.email);
 * }
 * ```
 *
 * @example Collect all items
 * ```typescript
 * const allPeople = await doorflow.people.list().toArray();
 * ```
 */
export class Page<T> implements AsyncIterable<T> {
  /** Items on the current page */
  readonly data: T[];
  /** Total number of items across all pages (if available) */
  readonly total?: number;
  /** Current page number (1-based) */
  readonly page: number;
  /** Items per page */
  readonly perPage: number;

  private readonly fetcher: PageFetcher<T>;

  constructor(
    data: T[],
    options: {
      total?: number;
      page: number;
      perPage: number;
      fetcher: PageFetcher<T>;
    }
  ) {
    this.data = data;
    this.total = options.total;
    this.page = options.page;
    this.perPage = options.perPage;
    this.fetcher = options.fetcher;
  }

  /**
   * Whether there are more pages available.
   */
  get hasMore(): boolean {
    if (this.total === undefined) {
      // If we don't know the total, assume more if we got a full page
      return this.data.length >= this.perPage;
    }
    return this.page * this.perPage < this.total;
  }

  /**
   * Fetch the next page of results.
   * @returns The next page, or null if no more pages.
   */
  async nextPage(): Promise<Page<T> | null> {
    if (!this.hasMore) {
      return null;
    }

    const nextPageNum = this.page + 1;
    const result = await this.fetcher({ page: nextPageNum, perPage: this.perPage });

    return new Page(result.data, {
      total: result.total ?? this.total,
      page: nextPageNum,
      perPage: this.perPage,
      fetcher: this.fetcher,
    });
  }

  /**
   * Async iterator for auto-pagination.
   * Automatically fetches subsequent pages as needed.
   */
  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    let currentPage: Page<T> | null = this;

    while (currentPage) {
      for (const item of currentPage.data) {
        yield item;
      }
      currentPage = await currentPage.nextPage();
    }
  }

  /**
   * Collect all items from all pages into an array.
   * Use with caution on large datasets.
   */
  async toArray(): Promise<T[]> {
    const items: T[] = [];
    for await (const item of this) {
      items.push(item);
    }
    return items;
  }

  /**
   * Get the first item, or undefined if empty.
   */
  first(): T | undefined {
    return this.data[0];
  }

  /**
   * Check if the page is empty.
   */
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  /**
   * Number of items on the current page.
   */
  get length(): number {
    return this.data.length;
  }
}

/**
 * Create a Page from API response data.
 */
export function createPage<T>(
  data: T[],
  total: number | undefined,
  options: ListOptions,
  fetcher: PageFetcher<T>
): Page<T> {
  return new Page(data, {
    total,
    page: options.page ?? 1,
    perPage: options.perPage ?? 25,
    fetcher,
  });
}
