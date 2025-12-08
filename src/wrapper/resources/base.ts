/**
 * Base Resource Class
 *
 * Provides common functionality for all resource classes.
 */

import { ApiClient, withErrorHandling } from '../client';
import { Page, createPage, ListOptions, PageFetcher } from '../pagination';

/**
 * Base class for all DoorFlow resources.
 */
export abstract class Resource {
  protected readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Execute an API call with error handling.
   */
  protected async execute<T>(fn: () => Promise<T>): Promise<T> {
    return withErrorHandling(fn);
  }

  /**
   * Create a paginated list from API results.
   */
  protected createList<T>(
    data: T[],
    options: ListOptions,
    fetcher: PageFetcher<T>
  ): Page<T> {
    // The DoorFlow API doesn't return total count in the response body,
    // so we infer "has more" from whether we got a full page
    return createPage(data, undefined, options, fetcher);
  }
}

/**
 * Mixin for resources that support create operations.
 */
export interface Creatable<TInput, TOutput> {
  create(data: TInput): Promise<TOutput>;
}

/**
 * Mixin for resources that support retrieve operations.
 */
export interface Retrievable<T> {
  retrieve(id: number | string): Promise<T>;
}

/**
 * Mixin for resources that support update operations.
 */
export interface Updatable<TInput, TOutput> {
  update(id: number | string, data: TInput): Promise<TOutput>;
}

/**
 * Mixin for resources that support delete operations.
 */
export interface Deletable {
  delete(id: number | string): Promise<void>;
}

/**
 * Mixin for resources that support list operations.
 */
export interface Listable<T, TOptions extends ListOptions = ListOptions> {
  list(options?: TOptions): Promise<Page<T>>;
}

/**
 * Convert snake_case keys to camelCase.
 */
export function toCamelCase<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = value;
  }
  return result as T;
}

/**
 * Convert camelCase keys to snake_case.
 */
export function toSnakeCase<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    result[snakeKey] = value;
  }
  return result as T;
}
