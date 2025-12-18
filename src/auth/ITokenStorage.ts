/**
 * Token Storage Interface
 *
 * Defines the contract for storing OAuth tokens. Applications must implement
 * this interface to provide their own storage mechanism (file, database, Redis, etc.).
 *
 * @example
 * ```typescript
 * // File-based storage example
 * const storage: ITokenStorage = {
 *   async load() {
 *     try {
 *       const data = await fs.readFile('./tokens.json', 'utf-8');
 *       return JSON.parse(data);
 *     } catch {
 *       return null;
 *     }
 *   },
 *   async save(tokens) {
 *     await fs.writeFile('./tokens.json', JSON.stringify(tokens, null, 2));
 *   },
 *   async clear() {
 *     await fs.unlink('./tokens.json').catch(() => {});
 *   },
 * };
 * ```
 */

/**
 * Stored OAuth tokens with metadata.
 */
export interface StoredTokens {
  /** The OAuth access token for API requests */
  accessToken: string;

  /** The OAuth refresh token for obtaining new access tokens */
  refreshToken: string;

  /** Unix timestamp (seconds) when the access token expires */
  expiresAt: number;

  /** The OAuth scopes that were granted */
  scope?: string;
}

/**
 * Token storage interface that applications must implement.
 *
 * This allows the SDK to remain runtime-agnostic while applications
 * choose their preferred storage mechanism.
 */
export interface ITokenStorage {
  /**
   * Load stored tokens.
   * @returns The stored tokens, or null if no tokens exist
   */
  load(): Promise<StoredTokens | null>;

  /**
   * Save tokens to storage.
   * @param tokens The tokens to save
   */
  save(tokens: StoredTokens): Promise<void>;

  /**
   * Clear all stored tokens.
   * Called during disconnect or when tokens become invalid.
   */
  clear(): Promise<void>;
}
