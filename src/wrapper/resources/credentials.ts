/**
 * Credentials Resource
 *
 * Manage credentials in DoorFlow. Credentials are access cards, PINs, etc.
 */

import { Credential } from '../../models';
import { Resource, Creatable, Retrievable, Updatable, Deletable, Listable } from './base';
import { Page, ListOptions } from '../pagination';

/**
 * Options for listing credentials.
 */
export interface ListCredentialsOptions extends ListOptions {
  /** Filter by person ID */
  personId?: number;
}

/**
 * Input for creating a credential.
 */
export interface CreateCredentialInput {
  /** Person ID to assign credential to */
  personId: number;
  /** Credential type ID */
  credentialTypeId: number;
  /** Credential value (card number, PIN, etc.). Use "******" to auto-generate a PIN. */
  value?: string;
}

/**
 * Input for updating a credential.
 */
export interface UpdateCredentialInput {
  /** New credential value */
  value: string;
}

/**
 * Credentials resource for managing access credentials.
 *
 * @example Create a credential
 * ```typescript
 * const credential = await doorflow.credentials.create({
 *   personId: 123,
 *   credentialTypeId: 1,
 *   value: '12345678',
 * });
 * ```
 */
export class CredentialsResource
  extends Resource
  implements
    Creatable<CreateCredentialInput, Credential>,
    Retrievable<Credential>,
    Updatable<UpdateCredentialInput, Credential>,
    Deletable,
    Listable<Credential, ListCredentialsOptions>
{
  /**
   * Create a new credential.
   */
  async create(data: CreateCredentialInput): Promise<Credential> {
    return this.execute(() =>
      this.client.credentialsApi.createCredential({
        personId: data.personId,
        credentialInput: {
          personCredential: {
            credentialTypeId: data.credentialTypeId,
            value: data.value,
          },
        },
      })
    );
  }

  /**
   * Retrieve a credential by ID.
   */
  async retrieve(id: number | string, personId?: number): Promise<Credential> {
    if (!personId) {
      throw new Error('personId is required to retrieve a credential');
    }
    return this.execute(() =>
      this.client.credentialsApi.getCredential({
        personId,
        id: String(id),
      })
    );
  }

  /**
   * Update a credential.
   */
  async update(id: number | string, data: UpdateCredentialInput, personId?: number): Promise<Credential> {
    if (!personId) {
      throw new Error('personId is required to update a credential');
    }
    return this.execute(() =>
      this.client.credentialsApi.updateCredential({
        personId,
        id: String(id),
        credentialUpdateInput: {
          personCredential: {
            value: data.value,
          },
        },
      })
    );
  }

  /**
   * Delete a credential.
   */
  async delete(id: number | string, personId?: number): Promise<void> {
    if (!personId) {
      throw new Error('personId is required to delete a credential');
    }
    await this.execute(() =>
      this.client.credentialsApi.deleteCredential({
        personId,
        id: String(id),
      })
    );
  }

  /**
   * List all credentials with pagination.
   */
  async list(options: ListCredentialsOptions = {}): Promise<Page<Credential>> {
    const fetcher = async (fetchOptions: ListOptions) => {
      const mergedOptions = { ...options, ...fetchOptions };
      let data: Credential[];

      if (mergedOptions.personId) {
        data = await this.execute(() =>
          this.client.credentialsApi.listPersonCredentials({
            personId: mergedOptions.personId!,
            perPage: mergedOptions.perPage,
            page: mergedOptions.page,
          })
        );
      } else {
        data = await this.execute(() =>
          this.client.credentialsApi.listAllCredentials({
            perPage: mergedOptions.perPage,
            page: mergedOptions.page,
          })
        );
      }

      return { data };
    };

    const result = await fetcher(options);
    return this.createList(result.data, options, fetcher);
  }
}
