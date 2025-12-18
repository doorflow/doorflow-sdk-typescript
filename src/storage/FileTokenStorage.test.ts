import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { FileTokenStorage } from './FileTokenStorage';
import type { StoredTokens } from '../auth/ITokenStorage';

describe('FileTokenStorage', () => {
  let tempDir: string;
  let tokenPath: string;
  let storage: FileTokenStorage;

  const testTokens: StoredTokens = {
    accessToken: 'test-access-token',
    refreshToken: 'test-refresh-token',
    expiresAt: 1234567890,
    scope: 'read write',
  };

  beforeEach(() => {
    // Create a temp directory for each test
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'doorflow-test-'));
    tokenPath = path.join(tempDir, 'tokens.json');
    storage = new FileTokenStorage(tokenPath);
  });

  afterEach(() => {
    // Clean up temp directory
    try {
      fs.rmSync(tempDir, { recursive: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  describe('save', () => {
    it('writes tokens to file', async () => {
      await storage.save(testTokens);

      const content = fs.readFileSync(tokenPath, 'utf-8');
      const saved = JSON.parse(content);

      expect(saved).toEqual(testTokens);
    });

    it('creates parent directories if they do not exist', async () => {
      const nestedPath = path.join(tempDir, 'nested', 'dir', 'tokens.json');
      const nestedStorage = new FileTokenStorage(nestedPath);

      await nestedStorage.save(testTokens);

      expect(fs.existsSync(nestedPath)).toBe(true);
    });

    it('overwrites existing tokens', async () => {
      await storage.save(testTokens);

      const newTokens: StoredTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresAt: 9999999999,
      };
      await storage.save(newTokens);

      const content = fs.readFileSync(tokenPath, 'utf-8');
      const saved = JSON.parse(content);

      expect(saved).toEqual(newTokens);
    });
  });

  describe('load', () => {
    it('returns null when file does not exist', async () => {
      const result = await storage.load();
      expect(result).toBeNull();
    });

    it('returns stored tokens when file exists', async () => {
      fs.writeFileSync(tokenPath, JSON.stringify(testTokens));

      const result = await storage.load();

      expect(result).toEqual(testTokens);
    });

    it('returns null when file contains invalid JSON', async () => {
      fs.writeFileSync(tokenPath, 'not valid json');

      const result = await storage.load();

      expect(result).toBeNull();
    });
  });

  describe('clear', () => {
    it('removes the token file', async () => {
      fs.writeFileSync(tokenPath, JSON.stringify(testTokens));
      expect(fs.existsSync(tokenPath)).toBe(true);

      await storage.clear();

      expect(fs.existsSync(tokenPath)).toBe(false);
    });

    it('does not throw when file does not exist', async () => {
      expect(fs.existsSync(tokenPath)).toBe(false);

      await expect(storage.clear()).resolves.toBeUndefined();
    });
  });

  describe('integration', () => {
    it('save then load returns same tokens', async () => {
      await storage.save(testTokens);
      const loaded = await storage.load();

      expect(loaded).toEqual(testTokens);
    });

    it('save, clear, load returns null', async () => {
      await storage.save(testTokens);
      await storage.clear();
      const loaded = await storage.load();

      expect(loaded).toBeNull();
    });
  });
});
