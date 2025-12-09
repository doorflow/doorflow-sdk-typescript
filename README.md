# DoorFlow TypeScript SDK

Official TypeScript/JavaScript SDK for the [DoorFlow](https://www.doorflow.com) Access Control API.

- **API version**: 3.0
- **SDK version**: 3.0.0
- **License**: MIT

## Requirements

Node.js 18+ or modern browser with ES2020 support

## Installation

```bash
npm install @doorflow/api
```

Or with yarn:

```bash
yarn add @doorflow/api
```

## Quick Start

```typescript
import { DoorFlow } from '@doorflow/api';

// Initialize the client with your API token
const client = new DoorFlow('your-api-token');

// List all people with auto-pagination
for await (const person of client.people.list()) {
  console.log(`${person.name} (${person.email})`);
}

// Create a new person
const person = await client.people.create({ name: 'John Smith', email: 'john@example.com' });
console.log(`Created: ${person.id}`);

// Unlock a door
await client.channels.unlock(channelId);
```

## Common Operations

### People Management

```typescript
// List with pagination
const page = await client.people.list({ page: 1, perPage: 50 });
console.log(`Found ${page.data.length} people`);

// Auto-paginate through all results
for await (const person of client.people.list()) {
  console.log(person.name);
}

// Get a specific person
const person = await client.people.retrieve(personId);

// Create a person
const newPerson = await client.people.create({
  name: 'Jane Doe',
  email: 'jane@example.com',
  groupIds: [1, 2, 3]
});

// Update a person
const updated = await client.people.update(personId, { name: 'Jane Smith' });

// Delete a person
await client.people.delete(personId);
```

### Door Control

```typescript
// List all channels (doors)
for await (const channel of client.channels.list()) {
  console.log(`${channel.name}: ${channel.mode}`);
}

// Unlock a door
await client.channels.unlock(channelId);

// Enable lockdown
await client.channels.lockdown(channelId);
```

### Credentials

```typescript
// List credentials for a person
const credentials = await client.credentials.listForPerson(personId);

// Create a credential
const credential = await client.credentials.create(personId, {
  credentialTypeId: 1,
  value: 'ABC123'
});
```

### Events

```typescript
// List recent events
const events = await client.events.list({
  after: new Date(Date.now() - 24 * 60 * 60 * 1000)
});

for await (const event of events) {
  console.log(`${event.createdAt}: ${event.eventType}`);
}
```

### Groups and Roles

```typescript
// List groups
for await (const group of client.groups.list()) {
  console.log(group.name);
}

// List roles
for await (const role of client.roles.list()) {
  console.log(role.name);
}
```

## Error Handling

```typescript
import { DoorFlow, DoorFlowError } from '@doorflow/api';

try {
  const person = await client.people.retrieve(99999);
} catch (error) {
  if (error instanceof DoorFlowError) {
    console.log(`Error ${error.statusCode}: ${error.message}`);
  }
}
```

## Configuration

```typescript
// Custom base URL (for testing)
const client = new DoorFlow('your-api-token', {
  baseUrl: 'https://sandbox.doorflow.com'
});
```

## Browser Usage

The SDK works in modern browsers:

```html
<script type="module">
  import { DoorFlow } from '@doorflow/api';

  const client = new DoorFlow('your-api-token');
  const account = await client.account.get();
  console.log(account.name);
</script>
```

## Low-Level API Access

For advanced use cases, you can access the generated API clients directly:

```typescript
import { Configuration, PeopleApi } from '@doorflow/api';

const config = new Configuration({
  accessToken: 'your-api-token'
});

const api = new PeopleApi(config);
const people = await api.listPeople({ page: 1, perPage: 50 });
```

## API Endpoints

| Resource | Operations |
|----------|------------|
| Account | get |
| People | list, create, retrieve, update, delete |
| Groups | list |
| Roles | list |
| Channels | list, retrieve, unlock, lockdown |
| Credentials | list, listForPerson, create, update, delete |
| Events | list, retrieve |
| Sites | list |
| Reservations | list, create, delete |
| GroupReservations | list, create, delete |
| NotificationRules | list, create, retrieve, update, delete |

## Documentation

- [DoorFlow API Documentation](https://developer.doorflow.com)
- [API Reference](https://developer.doorflow.com/docs/api)

## License

MIT License - see [LICENSE](LICENSE) for details.
