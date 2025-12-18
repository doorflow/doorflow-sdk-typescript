/**
 * File-based Token Storage
 *
 * A simple ITokenStorage implementation that persists tokens to a JSON file.
 * Useful for CLI tools, scripts, and local development.
 *
 * @example
 * ```typescript
 * import { FileTokenStorage } from '@doorflow/api';
 *
 * const storage = new FileTokenStorage('./tokens.json');
 * ```
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ITokenStorage, StoredTokens } from '../auth/ITokenStorage';

export class FileTokenStorage implements ITokenStorage {
  private filePath: string;

  /**
   * Create a file-based token storage.
   *
   * @param filePath Path to the JSON file for storing tokens.
   *                 Parent directories will be created if they don't exist.
   */
  constructor(filePath: string) {
    this.filePath = path.resolve(filePath);
  }

  async load(): Promise<StoredTokens | null> {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data) as StoredTokens;
    } catch {
      return null;
    }
  }

  async save(tokens: StoredTokens): Promise<void> {
    // Ensure parent directory exists
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(this.filePath, JSON.stringify(tokens, null, 2), 'utf-8');
  }

  async clear(): Promise<void> {
    try {
      fs.unlinkSync(this.filePath);
    } catch {
      // File doesn't exist, that's fine
    }
  }
}
