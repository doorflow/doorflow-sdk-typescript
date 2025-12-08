/**
 * People Resource
 *
 * Manage people in DoorFlow. People represent individuals who can
 * access doors through credentials, groups, and roles.
 */

import { Person, PersonInput } from '../../models';
import { Resource, Creatable, Retrievable, Updatable, Deletable, Listable } from './base';
import { Page } from '../pagination';
import { ListOptions } from '../pagination';

/**
 * Options for listing people.
 */
export interface ListPeopleOptions extends ListOptions {
  /** Filter by email address */
  email?: string;
  /** Filter by external system ID */
  systemId?: string;
  /** Return people modified since this date */
  since?: Date;
  /** Return people modified since this UTC date */
  sinceUtc?: Date;
}

/**
 * Input for creating a person.
 */
export interface CreatePersonInput {
  /** First name (required) */
  firstName: string;
  /** Last name (required) */
  lastName: string;
  /** Email address */
  email?: string;
  /** External system identifier */
  systemId?: string;
  /** Salutation (Mr., Ms., Dr., etc.) */
  salutation?: string;
  /** Job title */
  jobTitle?: string;
  /** Department name */
  department?: string;
  /** Phone number */
  phone?: string;
  /** Mobile phone number */
  mobile?: string;
  /** Whether the person is enabled for access */
  enabled?: boolean;
  /** Group IDs to assign */
  groupIds?: number[];
  /** Role IDs to assign */
  roleIds?: number[];
  /** Image URL for the person's photo */
  imageRemoteUrl?: string;
}

/**
 * Input for updating a person.
 */
export interface UpdatePersonInput {
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Email address */
  email?: string;
  /** External system identifier */
  systemId?: string;
  /** Salutation (Mr., Ms., Dr., etc.) */
  salutation?: string;
  /** Job title */
  jobTitle?: string;
  /** Department name */
  department?: string;
  /** Phone number */
  phone?: string;
  /** Mobile phone number */
  mobile?: string;
  /** Whether the person is enabled for access */
  enabled?: boolean;
  /** Group IDs to assign */
  groupIds?: number[];
  /** Role IDs to assign */
  roleIds?: number[];
  /** Image URL for the person's photo (empty string to delete) */
  imageRemoteUrl?: string;
}

/**
 * People resource for managing people in DoorFlow.
 *
 * @example Create a person
 * ```typescript
 * const person = await doorflow.people.create({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john@example.com',
 * });
 * ```
 *
 * @example List all people with auto-pagination
 * ```typescript
 * for await (const person of doorflow.people.list()) {
 *   console.log(person.email);
 * }
 * ```
 */
export class PeopleResource
  extends Resource
  implements
    Creatable<CreatePersonInput, Person>,
    Retrievable<Person>,
    Updatable<UpdatePersonInput, Person>,
    Deletable,
    Listable<Person, ListPeopleOptions>
{
  /**
   * Create a new person.
   *
   * @param data - Person data
   * @returns The created person
   */
  async create(data: CreatePersonInput): Promise<Person> {
    return this.execute(() =>
      this.client.peopleApi.createPerson({
        personInput: this.toPersonInput(data),
      })
    );
  }

  /**
   * Retrieve a person by ID.
   *
   * @param id - Person ID
   * @returns The person
   */
  async retrieve(id: number | string): Promise<Person> {
    return this.execute(() =>
      this.client.peopleApi.getPerson({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * Update a person.
   *
   * @param id - Person ID
   * @param data - Updated person data
   * @returns The updated person
   */
  async update(id: number | string, data: UpdatePersonInput): Promise<Person> {
    return this.execute(() =>
      this.client.peopleApi.updatePerson({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
        personInput: this.toPersonInput(data),
      })
    );
  }

  /**
   * Delete a person.
   *
   * @param id - Person ID
   */
  async delete(id: number | string): Promise<void> {
    await this.execute(() =>
      this.client.peopleApi.deletePerson({
        id: typeof id === 'string' ? parseInt(id, 10) : id,
      })
    );
  }

  /**
   * List people with pagination.
   *
   * @param options - List options
   * @returns A page of people (supports async iteration)
   */
  async list(options: ListPeopleOptions = {}): Promise<Page<Person>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const mergedOptions = { ...options, ...fetchOptions };
      const data = await this.execute(() =>
        this.client.peopleApi.listPeople({
          email: mergedOptions.email,
          systemId: mergedOptions.systemId,
          since: mergedOptions.since,
          sinceUtc: mergedOptions.sinceUtc,
          perPage: mergedOptions.perPage,
          page: mergedOptions.page,
        })
      );
      return { data };
    };

    const result = await fetcher(options);
    return this.createList(result.data, options, fetcher);
  }

  /**
   * Convert wrapper input to generated API input.
   */
  private toPersonInput(data: CreatePersonInput | UpdatePersonInput): PersonInput {
    return {
      person: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        systemId: data.systemId,
        salutation: data.salutation,
        jobTitle: data.jobTitle,
        department: data.department,
        phone: data.phone,
        mobile: data.mobile,
        enabled: data.enabled,
        groupIds: data.groupIds,
        roleIds: data.roleIds,
        imageRemoteUrl: data.imageRemoteUrl,
      },
    };
  }
}
