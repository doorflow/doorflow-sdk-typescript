import { Configuration, PeopleApi, Person } from '../../';
import { BaseResource } from './base-resource';
import { PaginationOptions, SearchOptions, PartialExcept } from '../type-guards';
import { PersonBuilder } from '../builders';

/**
 * Enhanced people resource
 */
export class PeopleResource extends BaseResource<PeopleApi> {
  constructor(config: Configuration) {
    super(config, PeopleApi);
  }

  /**
   * Create a new person
   */
  async create(data: PartialExcept<Person, 'email' | 'name'>): Promise<Person> {
    const person = new PersonBuilder()
      .withEmail(data.email)
      .withName(data.name)
      .withActive(data.active ?? true)
      .build();

    return this.api.createPerson({ person });
  }

  /**
   * Get a person by ID
   */
  async get(id: string): Promise<Person> {
    return this.api.getPerson({ id });
  }

  /**
   * Update a person
   */
  async update(id: string, data: Partial<Person>): Promise<Person> {
    return this.api.updatePerson({ id, person: data });
  }

  /**
   * Delete a person
   */
  async delete(id: string): Promise<void> {
    return this.api.deletePerson({ id });
  }

  /**
   * List people with pagination
   */
  async list(options: PaginationOptions = {}): Promise<Person[]> {
    const { page = 1, perPage = 50 } = options;
    return this.api.listPeople({ page, perPage });
  }

  /**
   * Search people
   */
  async search(options: SearchOptions): Promise<Person[]> {
    const { q, page = 1, perPage = 50 } = options;
    return this.api.searchPeople({ q, page, perPage });
  }

  /**
   * Find a person by email
   */
  async findByEmail(email: string): Promise<Person | null> {
    const results = await this.search({ q: email, perPage: 1 });
    return results[0] || null;
  }

  /**
   * Iterate through all people
   */
  async *all(options: PaginationOptions = {}): AsyncIterableIterator<Person> {
    yield* this.paginate(
      (page, perPage) => this.list({ ...options, page, perPage }),
      options
    );
  }

  /**
   * Batch create people
   */
  async createBatch(people: Array<PartialExcept<Person, 'email' | 'name'>>): Promise<Person[]> {
    return Promise.all(people.map(p => this.create(p)));
  }

  /**
   * Grant access to a person
   */
  async grantAccess(personId: string, doorId: string): Promise<void> {
    // This would call the appropriate API endpoint
    return this.api.grantAccess({ personId, doorId });
  }

  /**
   * Revoke access from a person
   */
  async revokeAccess(personId: string, doorId: string): Promise<void> {
    // This would call the appropriate API endpoint
    return this.api.revokeAccess({ personId, doorId });
  }
}