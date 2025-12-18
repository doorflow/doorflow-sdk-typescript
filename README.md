# DoorFlow Node.js Library

The DoorFlow Node library provides convenient access to the DoorFlow API from
applications written in server-side JavaScript and TypeScript.

## Documentation

See the [DoorFlow API docs](https://developer.doorflow.com/docs) for API documentation.

## Requirements

Node.js 18 LTS or later.

## Installation

Install the package with:

```sh
npm install doorflow
# or
yarn add doorflow
```

## Usage

The package uses OAuth 2.0 for authentication. You'll need to [create an OAuth application](https://developer.doorflow.com/applications)
in your DoorFlow developer account to get client credentials.

```ts
import { DoorFlow, FileTokenStorage } from 'doorflow';

const doorflow = new DoorFlow({
  clientId: process.env.DOORFLOW_CLIENT_ID!,
  clientSecret: process.env.DOORFLOW_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
  storage: new FileTokenStorage('./tokens.json'),
});

// First run: redirect user to authorize
if (!await doorflow.isAuthenticated()) {
  const { url, state } = await doorflow.getAuthorizationUrl();
  // Store state in session, redirect user to url
}

// After callback: exchange code for tokens
await doorflow.handleCallback(code, state, expectedState);

// Now you can use the API
const people = await doorflow.people.listPeople({});
console.log(people);
```

The `DoorFlow` client provides access to all API resources as properties:

```ts
doorflow.people          // People management
doorflow.channels        // Channels
doorflow.credentials     // Access credentials
doorflow.events          // Activity logs
doorflow.groups          // Groups
doorflow.reservations    // Temporary access
// ... and more
```

### OAuth Authorization Flow

The `DoorFlow` client handles the OAuth 2.0 authorization code flow:

```ts
import { DoorFlow, FileTokenStorage } from 'doorflow';

// lib/doorflow.ts - create a shared instance
export const doorflow = new DoorFlow({
  clientId: process.env.DOORFLOW_CLIENT_ID!,
  clientSecret: process.env.DOORFLOW_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
  storage: new FileTokenStorage('./tokens.json'),
});

// routes/auth.ts
import { doorflow } from '../lib/doorflow';

// 1. Generate authorization URL and redirect user
app.get('/auth/doorflow', async (req, res) => {
  const { url, state } = await doorflow.getAuthorizationUrl();
  req.session.oauthState = state;  // Store for CSRF validation
  res.redirect(url);
});

// 2. Handle callback after user authorizes
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  const expectedState = req.session.oauthState;

  await doorflow.handleCallback(code, state, expectedState);
  res.redirect('/dashboard');
});

// 3. Use APIs - tokens refresh automatically
app.get('/dashboard', async (req, res) => {
  const people = await doorflow.people.listPeople({});
  res.json(people);
});
```

### Usage with TypeScript

Import types directly from the package:

```ts
import {
  DoorFlow,
  FileTokenStorage,
  type Person,
} from 'doorflow';

const doorflow = new DoorFlow({
  clientId: process.env.DOORFLOW_CLIENT_ID!,
  clientSecret: process.env.DOORFLOW_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
  storage: new FileTokenStorage('./tokens.json'),
});

const people: Person[] = await doorflow.people.listPeople({});
```

## Configuration

The `DoorFlow` client accepts the following options:

| Option | Default | Description |
| ------ | ------- | ----------- |
| `clientId` | Required | Your DoorFlow OAuth client ID |
| `clientSecret` | `undefined` | Your OAuth client secret (optional for PKCE/public clients) |
| `redirectUri` | Required | The redirect URI registered with your OAuth application |
| `storage` | Required | Token storage implementation (see below) |
| `scopes` | `['account.person', 'account.channel.readonly', 'account.event.access.readonly']` | OAuth scopes to request |
| `refreshBufferSeconds` | `300` | Seconds before expiry to trigger automatic token refresh |
| `basePath` | `'https://api.doorflow.com'` | DoorFlow API base URL |

## Token Storage

The SDK includes `FileTokenStorage` for simple file-based token persistence:

```ts
import { FileTokenStorage } from 'doorflow';

const storage = new FileTokenStorage('./tokens.json');
```

For production applications, you can implement the `ITokenStorage` interface to use
your preferred storage mechanism (database, Redis, etc.):

```ts
interface ITokenStorage {
  load(): Promise<StoredTokens | null>;
  save(tokens: StoredTokens): Promise<void>;
  clear(): Promise<void>;
}

interface StoredTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;  // Unix timestamp in seconds
  scope?: string;
}
```

### Database storage example

```ts
import type { ITokenStorage, StoredTokens } from 'doorflow';

const dbStorage: ITokenStorage = {
  async load() {
    const row = await db.query('SELECT * FROM oauth_tokens WHERE id = ?', [userId]);
    if (!row) return null;
    return {
      accessToken: row.access_token,
      refreshToken: row.refresh_token,
      expiresAt: row.expires_at,
      scope: row.scope,
    };
  },
  async save(tokens: StoredTokens) {
    await db.query(
      'INSERT OR REPLACE INTO oauth_tokens (id, access_token, refresh_token, expires_at, scope) VALUES (?, ?, ?, ?, ?)',
      [userId, tokens.accessToken, tokens.refreshToken, tokens.expiresAt, tokens.scope]
    );
  },
  async clear() {
    await db.query('DELETE FROM oauth_tokens WHERE id = ?', [userId]);
  },
};
```

## PKCE for Browser Apps

For browser-based applications that cannot securely store a client secret, use PKCE
(Proof Key for Code Exchange):

```ts
import { DoorFlow } from 'doorflow';

const doorflow = new DoorFlow({
  clientId: 'your_client_id',
  // No clientSecret needed for public clients
  redirectUri: 'http://localhost:3000/callback',
  storage: browserStorageAdapter,  // You'll need a browser-compatible storage
});

// Generate authorization URL with PKCE
const { url, state, codeVerifier } = await doorflow.getAuthorizationUrl({
  usePKCE: true
});

// Store state and codeVerifier in sessionStorage
sessionStorage.setItem('oauth_state', state);
sessionStorage.setItem('oauth_verifier', codeVerifier!);

// Redirect to authorization
window.location.href = url;

// In callback handler
const code = new URLSearchParams(window.location.search).get('code');
const state = new URLSearchParams(window.location.search).get('state');
const expectedState = sessionStorage.getItem('oauth_state');
const codeVerifier = sessionStorage.getItem('oauth_verifier');

await doorflow.handleCallback(code!, state!, expectedState!, codeVerifier!);
```

## Token Refresh

DoorFlow rotates refresh tokens on each use. The SDK handles this automatically:

- Tokens are refreshed 5 minutes before expiry (configurable via `refreshBufferSeconds`)
- New refresh tokens are automatically stored via your `ITokenStorage` implementation
- If refresh fails, tokens are cleared and you'll need to re-authenticate

You can also manually check authentication status:

```ts
// Check if user has stored tokens
const isAuthenticated = await doorflow.isAuthenticated();

// Disconnect (revokes tokens and clears storage)
await doorflow.disconnect();
```

## API Classes

The SDK provides typed API classes for all DoorFlow resources:

| Class | Description |
| ----- | ----------- |
| `AccountsApi` | Account details |
| `PeopleApi` | Manage people records |
| `ChannelsApi` | Door controllers and access points |
| `CredentialsApi` | Access credentials (cards, fobs, PINs) |
| `GroupsApi` | Access groups |
| `RolesApi` | User roles |
| `ReservationsApi` | Temporary access reservations |
| `GroupReservationsApi` | Bulk reservations |
| `EventsApi` | Access events and activity logs |
| `NotificationRulesApi` | Event notification rules |
| `SitesApi` | Site/location management |
| `SyncApi` | Trigger controller sync |
| `OauthApi` | OAuth token management |

Example using multiple APIs:

```ts
// Create a person
const person = await doorflow.people.createPerson({
  personInput: {
    person: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    },
  },
});

// List available channels
const channels = await doorflow.channels.listChannels({});

// Unlock a door
await doorflow.channels.unlockChannel({ id: channels[0].id });
```

## Webhooks

DoorFlow sends webhooks to notify your application of events. The SDK provides
an event-based handler with automatic resource fetching:

```ts
import { DoorFlow, FileTokenStorage } from 'doorflow';

const doorflow = new DoorFlow({
  clientId: process.env.DOORFLOW_CLIENT_ID!,
  clientSecret: process.env.DOORFLOW_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
  storage: new FileTokenStorage('./tokens.json'),
});

const webhooks = new DoorFlow.WebhookHandler({
  secret: process.env.DOORFLOW_WEBHOOK_SECRET!,
  doorflow, // Optional: enables auto-fetching of resources
});

webhooks.on('Event.CREATE', async (event, accessEvent) => {
  // accessEvent may be undefined if the resource was deleted or fetch failed
  if (!accessEvent) return;

  console.log('Access:', accessEvent.person?.name, 'at', accessEvent.channel?.name);
});

webhooks.on('PersonCredential.UPDATE', async (event, credential) => {
  console.log('Credential updated:', credential?.cardNumber);
});

webhooks.on('*', async (event) => {
  // Catch-all for any event type
  console.log('Webhook received:', event.resourceType, event.action);
});

// Framework-agnostic handler
app.post('/webhook', async (req, res) => {
  try {
    await webhooks.handle(req.body, req.headers);
    res.status(200).send();
  } catch (err) {
    res.status(401).send('Invalid webhook');
  }
});
```

### Event Patterns

Register handlers using `ResourceType.ACTION` patterns:

| Pattern | Description |
|---------|-------------|
| `Event.CREATE` | New access event |
| `Event.UPDATE` | Access event updated |
| `Event.DESTROY` | Access event deleted |
| `PersonCredential.CREATE` | New credential added |
| `PersonCredential.UPDATE` | Credential updated |
| `PersonCredential.DESTROY` | Credential deleted |
| `*` | Catch-all for any event |

### Without Auto-Fetch

If you don't need automatic resource fetching, omit the `doorflow` option:

```ts
const webhooks = new DoorFlow.WebhookHandler({
  secret: process.env.DOORFLOW_WEBHOOK_SECRET!,
});

webhooks.on('Event.CREATE', async (event) => {
  // event contains resourceId, resourceType, action, etc.
  console.log('New event:', event.resourceId);
});
```

### Low-Level Verification

For more control, use `DoorFlow.webhooks.verify()` directly:

```ts
app.post('/webhook', (req, res) => {
  try {
    const events = DoorFlow.webhooks.verify(
      req.body,
      req.headers['signature'],
      req.headers['timestamp'],
      process.env.DOORFLOW_WEBHOOK_SECRET!
    );

    for (const event of events) {
      console.log(event.action, event.resourceType, event.resourceId);
    }

    res.status(200).send();
  } catch (err) {
    res.status(401).send('Invalid signature');
  }
});
```

### Testing Webhooks

Generate test signatures for your tests:

```ts
const payload = [{ action: 'CREATE', resource_type: 'Event', ... }];
const timestamp = Math.floor(Date.now() / 1000).toString();
const secret = 'test-secret';

const signature = DoorFlow.webhooks.generateTestSignature(payload, timestamp, secret);
const events = DoorFlow.webhooks.verify(payload, signature, timestamp, secret);
```

## Documentation

- [DoorFlow API Documentation](https://developer.doorflow.com)
- [API Reference](https://developer.doorflow.com/docs/api)

## License

MIT License - see [LICENSE](LICENSE) for details.
