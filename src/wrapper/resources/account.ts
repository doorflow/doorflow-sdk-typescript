/**
 * Account Resource
 *
 * Access account information in DoorFlow.
 */

import { Account } from '../../models';
import { Resource } from './base';

/**
 * Account resource for accessing account information.
 *
 * This is a singleton resource - there is only one account
 * associated with the API key.
 *
 * @example Get account details
 * ```typescript
 * const account = await doorflow.account.retrieve();
 * console.log(account.name);
 * ```
 */
export class AccountResource extends Resource {
  /**
   * Retrieve the current account.
   */
  async retrieve(): Promise<Account> {
    return this.execute(() => this.client.accountsApi.getAccount());
  }
}
