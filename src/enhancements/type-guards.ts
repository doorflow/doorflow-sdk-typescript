import { Person, Group, Authenticate200Response as AuthToken } from '../models';

/**
 * Type guard to check if an object is a Person
 */
export function isPerson(obj: any): obj is Person {
  return obj &&
    typeof obj.email === 'string' &&
    typeof obj.name === 'string';
}

/**
 * Type guard to check if an object is a Group
 */
export function isGroup(obj: any): obj is Group {
  return obj &&
    typeof obj.name === 'string' &&
    (obj.id === undefined || typeof obj.id === 'string');
}

/**
 * Type guard to check if an object is an AuthToken
 */
export function isAuthToken(obj: any): obj is AuthToken {
  return obj &&
    typeof obj.success === 'boolean' &&
    typeof obj.apiKey === 'string';
}

/**
 * Type for objects that have an ID
 */
export interface Identifiable {
  id?: string;
}

/**
 * Check if a model is persisted (has an ID)
 */
export function isPersisted<T extends Identifiable>(model: T): boolean {
  return model.id !== undefined && model.id !== null;
}

/**
 * Utility type for making all properties optional except specified keys
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Utility type for API responses
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * Search options
 */
export interface SearchOptions extends PaginationOptions {
  q: string;
  fields?: string[];
}