# TypeScript SDK Idiomatic Wrapper Design

**Date:** 2025-12-08
**Status:** Approved

## Overview

Add an idiomatic TypeScript wrapper layer on top of the generated OpenAPI client, following Stripe SDK conventions. The goal is to provide a developer experience that feels native to TypeScript while maintaining full backwards compatibility with the generated code.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| API Style | Stripe-like namespaces | `doorflow.people.create()` is idiomatic TypeScript |
| Error Handling | Typed exceptions | `DoorFlow.NotFoundError` with full type support |
| Pagination | Async iterators | Native `for await...of` support |

## Package Structure

```
src/
├── apis/           # Generated OpenAPI code (existing)
├── models/         # Generated models (existing)
├── runtime.ts      # Generated runtime (existing)
├── index.ts        # Generated exports (existing)
└── wrapper/        # NEW: Idiomatic wrapper
    ├── index.ts        # Main DoorFlow class
    ├── client.ts       # API client configuration
    ├── errors.ts       # Typed error classes
    ├── pagination.ts   # Async iterator support
    └── resources/      # Resource classes
        ├── people.ts
        ├── channels.ts
        ├── groups.ts
        └── ... (12 total)
```

## Configuration

```typescript
import DoorFlow from '@doorflow/sdk';

// Simple initialization
const doorflow = new DoorFlow('your_api_key');

// Or with options
const doorflow = new DoorFlow({
  apiKey: 'your_api_key',
  baseUrl: 'https://api.doorflow.com',  // optional
});
```

## Resource API

Each resource provides consistent CRUD methods:

```typescript
// Create
const person = await doorflow.people.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
});

// Retrieve
const person = await doorflow.people.retrieve('person_123');

// Update
const updated = await doorflow.people.update('person_123', {
  firstName: 'Jane',
});

// Delete
await doorflow.people.delete('person_123');

// List (returns async iterable)
const page = await doorflow.people.list({ perPage: 50 });
console.log(page.data);  // Person[]

// Auto-pagination with async iterator
for await (const person of doorflow.people.list()) {
  console.log(person.email);
}
```

Resource-specific methods where applicable:

```typescript
// Channels have unlock/lock operations
await doorflow.channels.unlock('channel_123', { duration: 5 });
await doorflow.channels.lock('channel_123');
```

## Error Handling

Typed error hierarchy:

```typescript
class DoorFlowError extends Error {
  readonly status?: number;
  readonly code?: string;
  readonly requestId?: string;
}

class AuthenticationError extends DoorFlowError {}  // 401
class ForbiddenError extends DoorFlowError {}       // 403
class NotFoundError extends DoorFlowError {}        // 404
class ValidationError extends DoorFlowError {       // 422
  readonly errors: Record<string, string[]>;
}
class RateLimitError extends DoorFlowError {        // 429
  readonly retryAfter?: number;
}
class ApiError extends DoorFlowError {}             // 5xx / other
```

Usage:

```typescript
try {
  await doorflow.people.create({ firstName: 'John' });
} catch (e) {
  if (e instanceof DoorFlow.ValidationError) {
    console.log(e.errors);  // { lastName: ['is required'] }
  } else if (e instanceof DoorFlow.NotFoundError) {
    console.log('Person not found');
  }
}
```

## Pagination

The `list()` methods return a `Page<T>` that's also an async iterable:

```typescript
interface Page<T> {
  data: T[];
  total?: number;
  page: number;
  perPage: number;
  hasMore: boolean;

  nextPage(): Promise<Page<T> | null>;
  [Symbol.asyncIterator](): AsyncIterator<T>;
}

// Manual pagination
let page = await doorflow.people.list({ perPage: 100 });
while (page) {
  process(page.data);
  page = await page.nextPage();
}

// Automatic pagination (preferred)
for await (const person of doorflow.people.list({ perPage: 100 })) {
  process(person);
}

// Collect all into array
const allPeople = await doorflow.people.list().toArray();
```

## Resources

| Resource | create | retrieve | update | delete | list | Special Methods |
|----------|--------|----------|--------|--------|------|-----------------|
| `people` | Y | Y | Y | Y | Y | |
| `groups` | | Y | | | Y | |
| `roles` | | Y | | | Y | |
| `channels` | | Y | | | Y | `unlock()`, `lock()`, `lockdown()` |
| `credentials` | Y | Y | Y | Y | Y | |
| `credentialTypes` | | Y | | | Y | |
| `events` | | Y | | | Y | |
| `sites` | | Y | | | Y | |
| `reservations` | Y | Y | Y | Y | Y | |
| `groupReservations` | Y | Y | Y | Y | Y | |
| `notificationRules` | Y | Y | Y | Y | Y | |
| `account` | | Y | | | | (singleton) |

## Backwards Compatibility

The main package export remains the generated code. The wrapper is an additional export:

```typescript
// Existing (still works)
import { PeopleApi, Configuration } from '@doorflow/sdk';

// New wrapper
import DoorFlow from '@doorflow/sdk';
```
