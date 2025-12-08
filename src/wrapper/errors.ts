/**
 * DoorFlow API Error Classes
 *
 * Typed exceptions for handling API errors with full TypeScript support.
 */

/**
 * Base error class for all DoorFlow API errors.
 */
export class DoorFlowError extends Error {
  /** HTTP status code */
  readonly status?: number;
  /** Error code from the API */
  readonly code?: string;
  /** Request ID for debugging */
  readonly requestId?: string;
  /** Raw response body */
  readonly rawResponse?: unknown;

  constructor(
    message: string,
    options?: {
      status?: number;
      code?: string;
      requestId?: string;
      rawResponse?: unknown;
    }
  ) {
    super(message);
    this.name = 'DoorFlowError';
    this.status = options?.status;
    this.code = options?.code;
    this.requestId = options?.requestId;
    this.rawResponse = options?.rawResponse;

    // Maintains proper stack trace in V8 environments
    const ErrorConstructor = Error as unknown as { captureStackTrace?: (target: object, constructor: Function) => void };
    if (typeof ErrorConstructor.captureStackTrace === 'function') {
      ErrorConstructor.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Authentication failed (401).
 * The API key is missing, invalid, or expired.
 */
export class AuthenticationError extends DoorFlowError {
  constructor(message = 'Authentication failed', options?: ConstructorParameters<typeof DoorFlowError>[1]) {
    super(message, { ...options, status: 401 });
    this.name = 'AuthenticationError';
  }
}

/**
 * Access forbidden (403).
 * The API key doesn't have permission for this operation.
 */
export class ForbiddenError extends DoorFlowError {
  constructor(message = 'Access forbidden', options?: ConstructorParameters<typeof DoorFlowError>[1]) {
    super(message, { ...options, status: 403 });
    this.name = 'ForbiddenError';
  }
}

/**
 * Resource not found (404).
 * The requested resource doesn't exist.
 */
export class NotFoundError extends DoorFlowError {
  constructor(message = 'Resource not found', options?: ConstructorParameters<typeof DoorFlowError>[1]) {
    super(message, { ...options, status: 404 });
    this.name = 'NotFoundError';
  }
}

/**
 * Validation error (422).
 * The request data failed validation.
 */
export class ValidationError extends DoorFlowError {
  /** Field-level validation errors */
  readonly errors: Record<string, string[]>;

  constructor(
    message = 'Validation failed',
    errors: Record<string, string[]> = {},
    options?: ConstructorParameters<typeof DoorFlowError>[1]
  ) {
    super(message, { ...options, status: 422 });
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Rate limit exceeded (429).
 * Too many requests in a given time period.
 */
export class RateLimitError extends DoorFlowError {
  /** Seconds until the rate limit resets */
  readonly retryAfter?: number;

  constructor(
    message = 'Rate limit exceeded',
    retryAfter?: number,
    options?: ConstructorParameters<typeof DoorFlowError>[1]
  ) {
    super(message, { ...options, status: 429 });
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Server error (5xx).
 * An unexpected error occurred on the server.
 */
export class ApiError extends DoorFlowError {
  constructor(message = 'API error', options?: ConstructorParameters<typeof DoorFlowError>[1]) {
    super(message, options);
    this.name = 'ApiError';
  }
}

/**
 * Create the appropriate error class from an HTTP response.
 */
export function createErrorFromResponse(
  status: number,
  body: unknown,
  requestId?: string
): DoorFlowError {
  const message = extractErrorMessage(body);
  const options = { status, requestId, rawResponse: body };

  switch (status) {
    case 401:
      return new AuthenticationError(message, options);
    case 403:
      return new ForbiddenError(message, options);
    case 404:
      return new NotFoundError(message, options);
    case 422:
      return new ValidationError(message, extractValidationErrors(body), options);
    case 429:
      return new RateLimitError(message, extractRetryAfter(body), options);
    default:
      if (status >= 500) {
        return new ApiError(message, options);
      }
      return new DoorFlowError(message, options);
  }
}

function extractErrorMessage(body: unknown): string {
  if (typeof body === 'object' && body !== null) {
    const obj = body as Record<string, unknown>;
    if (typeof obj.message === 'string') return obj.message;
    if (typeof obj.error === 'string') return obj.error;
    if (typeof obj.error === 'object' && obj.error !== null) {
      const err = obj.error as Record<string, unknown>;
      if (typeof err.message === 'string') return err.message;
    }
  }
  return 'An error occurred';
}

function extractValidationErrors(body: unknown): Record<string, string[]> {
  if (typeof body === 'object' && body !== null) {
    const obj = body as Record<string, unknown>;
    if (typeof obj.errors === 'object' && obj.errors !== null) {
      return obj.errors as Record<string, string[]>;
    }
  }
  return {};
}

function extractRetryAfter(body: unknown): number | undefined {
  if (typeof body === 'object' && body !== null) {
    const obj = body as Record<string, unknown>;
    if (typeof obj.retry_after === 'number') return obj.retry_after;
    if (typeof obj.retryAfter === 'number') return obj.retryAfter;
  }
  return undefined;
}
