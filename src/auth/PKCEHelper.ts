/**
 * PKCE (Proof Key for Code Exchange) Helper
 *
 * Provides utilities for implementing the PKCE extension to OAuth 2.0,
 * which is required for public clients (browser-based apps) that cannot
 * securely store a client secret.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7636
 */

/**
 * Generate a cryptographically random code verifier.
 * The verifier is a high-entropy random string used in PKCE.
 *
 * @returns A 43-character URL-safe base64 encoded random string
 */
export function generateCodeVerifier(): string {
  // Generate 32 random bytes (256 bits of entropy)
  const array = new Uint8Array(32);

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    // Browser environment
    crypto.getRandomValues(array);
  } else {
    // Node.js environment - use require to avoid bundling issues
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeCrypto = require('crypto');
    const randomBytes = nodeCrypto.randomBytes(32);
    array.set(randomBytes);
  }

  // Convert to URL-safe base64 (without padding)
  return base64UrlEncode(array);
}

/**
 * Generate a code challenge from a code verifier using SHA-256.
 * The challenge is sent to the authorization server, while the verifier
 * is kept secret until the token exchange.
 *
 * @param verifier The code verifier to hash
 * @returns The base64url-encoded SHA-256 hash of the verifier
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);

  let hashBuffer: ArrayBuffer;

  if (typeof crypto !== 'undefined' && crypto.subtle) {
    // Browser environment with SubtleCrypto
    hashBuffer = await crypto.subtle.digest('SHA-256', data);
  } else {
    // Node.js environment
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeCrypto = require('crypto');
    const hash = nodeCrypto.createHash('sha256').update(data).digest();
    hashBuffer = hash.buffer.slice(hash.byteOffset, hash.byteOffset + hash.byteLength);
  }

  return base64UrlEncode(new Uint8Array(hashBuffer));
}

/**
 * Generate a cryptographically secure random state parameter.
 * The state parameter is used for CSRF protection in OAuth flows.
 *
 * @returns A 32-character hex string
 */
export function generateState(): string {
  const array = new Uint8Array(16);

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    // Browser environment
    crypto.getRandomValues(array);
  } else {
    // Node.js environment
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeCrypto = require('crypto');
    const randomBytes = nodeCrypto.randomBytes(16);
    array.set(randomBytes);
  }

  // Convert to hex string
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Encode a Uint8Array to URL-safe base64 (without padding).
 */
function base64UrlEncode(buffer: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]);
  }

  // Use btoa if available (browser), otherwise Buffer (Node.js)
  let base64: string;
  if (typeof btoa === 'function') {
    base64 = btoa(binary);
  } else {
    base64 = Buffer.from(buffer).toString('base64');
  }

  // Convert to URL-safe base64 and remove padding
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
