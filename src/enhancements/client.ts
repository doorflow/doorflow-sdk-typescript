import { Configuration, AuthenticationApi, PeopleApi, GroupsApi, DoorFlowApi } from '../';
import { PeopleResource } from './resources/people-resource';
import { GroupsResource } from './resources/groups-resource';
import { AuthResource } from './resources/auth-resource';

/**
 * Client options
 */
export interface ClientOptions {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

/**
 * Enhanced client with Stripe-style interface
 */
export class Client {
  private config: Configuration;
  
  // Resource instances
  private _people?: PeopleResource;
  private _groups?: GroupsResource;
  private _auth?: AuthResource;

  constructor(options: ClientOptions = {}) {
    this.config = new Configuration({
      basePath: options.baseUrl,
      apiKey: options.apiKey ? `Bearer ${options.apiKey}` : undefined,
      headers: options.headers,
    });
  }

  /**
   * Create client from API key
   */
  static fromApiKey(apiKey: string, options: Omit<ClientOptions, 'apiKey'> = {}): Client {
    return new Client({ ...options, apiKey });
  }

  /**
   * Create client from environment variables
   */
  static fromEnv(options: Omit<ClientOptions, 'apiKey' | 'baseUrl'> = {}): Client {
    const apiKey = process.env.DOORFLOW_API_KEY;
    const baseUrl = process.env.DOORFLOW_BASE_URL;

    if (!apiKey) {
      throw new Error('DOORFLOW_API_KEY environment variable not set');
    }

    return new Client({ ...options, apiKey, baseUrl });
  }

  /**
   * People resource
   */
  get people(): PeopleResource {
    if (!this._people) {
      this._people = new PeopleResource(this.config);
    }
    return this._people;
  }

  /**
   * Groups resource
   */
  get groups(): GroupsResource {
    if (!this._groups) {
      this._groups = new GroupsResource(this.config);
    }
    return this._groups;
  }

  /**
   * Auth resource
   */
  get auth(): AuthResource {
    if (!this._auth) {
      this._auth = new AuthResource(this.config);
    }
    return this._auth;
  }

  /**
   * Test connection to API
   */
  async testConnection(): Promise<boolean> {
    try {
      // Make a simple API call to test connection
      await this.auth.test();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): Configuration {
    return this.config;
  }

  /**
   * Update API key
   */
  setApiKey(apiKey: string): void {
    this.config.apiKey = `Bearer ${apiKey}`;
  }
}