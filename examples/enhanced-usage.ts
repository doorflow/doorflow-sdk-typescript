import { Client, create, isPerson } from '../src';

async function main() {
  // Initialize client
  const client = Client.fromApiKey('your-api-key');
  
  // Or from environment
  const envClient = Client.fromEnv();
  
  // Test connection
  if (await client.testConnection()) {
    console.log('✅ Connected successfully!');
  }
  
  // Create a person using builder
  const person = await client.people.create(
    create.person()
      .withEmail('john@example.com')
      .withName('John Doe')
      .withActive(true)
      .build()
  );
  
  // Or directly
  const directPerson = await client.people.create({
    email: 'jane@example.com',
    name: 'Jane Doe',
    active: true
  });
  
  // Type-safe checks
  if (isPerson(person)) {
    console.log(`Created person: ${person.name}`);
  }
  
  // Find by email
  const found = await client.people.findByEmail('john@example.com');
  if (found) {
    console.log(`Found: ${found.name}`);
  }
  
  // Search with pagination
  const searchResults = await client.people.search({
    q: 'Doe',
    page: 1,
    perPage: 10
  });
  
  // Iterate through all people
  for await (const person of client.people.all()) {
    console.log(`Processing ${person.name}`);
  }
  
  // Batch operations
  const newPeople = await client.people.createBatch([
    { email: 'user1@example.com', name: 'User One' },
    { email: 'user2@example.com', name: 'User Two' },
  ]);
  
  // Grant access
  await client.people.grantAccess(person.id!, 'door-123');
  
  // Error handling with retries (built-in)
  try {
    const result = await client.people.get('invalid-id');
  } catch (error) {
    console.error('Person not found');
  }
}

// Run the example
main().catch(console.error);