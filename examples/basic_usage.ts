import { 
  Configuration,
  PeopleApi,
  DoorControllersApi,
  EventsApi,
  Person,
  PersonRequest
} from 'doorflow-api';

// Configure the client
const config = new Configuration({
  clientId: process.env.DOORFLOW_CLIENT_ID,
  clientSecret: process.env.DOORFLOW_CLIENT_SECRET,
  basePath: 'https://api.doorflow.com/api/2'
});

// Initialize API clients
const peopleApi = new PeopleApi(config);
const doorControllersApi = new DoorControllersApi(config);
const eventsApi = new EventsApi(config);

// Example 1: List all people
async function listPeople() {
  try {
    const people = await peopleApi.listPeople({
      page: 1,
      perPage: 50
    });
    
    people.forEach(person => {
      console.log(`${person.firstName} ${person.lastName} - ${person.email}`);
    });
  } catch (error) {
    console.error('Error listing people:', error);
  }
}

// Example 2: Create a new person
async function createPerson() {
  try {
    const newPerson: PersonRequest = {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      enabled: true,
      credentialsNumber: '11111',
      pin: '9999'
    };
    
    const created = await peopleApi.createPerson({
      personRequest: newPerson
    });
    
    console.log(`Created person with ID: ${created.id}`);
    return created;
  } catch (error) {
    console.error('Error creating person:', error);
  }
}

// Example 3: Update a person
async function updatePerson(personId: number) {
  try {
    const updates: PersonRequest = {
      enabled: false,
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    };
    
    const updated = await peopleApi.updatePersonById({
      personId,
      personRequest: updates
    });
    
    console.log(`Updated person: ${updated.id}`);
  } catch (error) {
    console.error('Error updating person:', error);
  }
}

// Example 4: Manage door access
async function manageDoorAccess() {
  try {
    // List door controllers
    const controllers = await doorControllersApi.listDoorControllers();
    console.log(`Found ${controllers.length} door controllers`);
    
    if (controllers.length > 0) {
      const controller = controllers[0];
      
      // Unlock door
      await doorControllersApi.unlockDoorController({
        id: controller.id
      });
      console.log(`Unlocked door: ${controller.name}`);
      
      // Wait 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Return to normal mode
      await doorControllersApi.setDoorControllerToNormalMode({
        id: controller.id
      });
      console.log(`Door returned to normal mode: ${controller.name}`);
    }
  } catch (error) {
    console.error('Error managing door access:', error);
  }
}

// Example 5: Monitor events in real-time
async function monitorEvents() {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 60 * 60 * 1000); // 1 hour ago
    
    const events = await eventsApi.listEvents({
      page: 1,
      perPage: 50,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
    
    events.forEach(event => {
      console.log(`${event.createdAt}: ${event.personName} - ${event.doorControllerName} - ${event.eventType}`);
    });
    
    // Set up polling for real-time updates
    setInterval(async () => {
      const newEndDate = new Date();
      const newEvents = await eventsApi.listEvents({
        page: 1,
        perPage: 10,
        startDate: endDate.toISOString(),
        endDate: newEndDate.toISOString()
      });
      
      if (newEvents.length > 0) {
        console.log(`\nNew events detected:`);
        newEvents.forEach(event => {
          console.log(`${event.createdAt}: ${event.personName} - ${event.eventType}`);
        });
      }
    }, 10000); // Poll every 10 seconds
    
  } catch (error) {
    console.error('Error monitoring events:', error);
  }
}

// Example 6: Batch operations
async function batchOperations() {
  try {
    // Create multiple people
    const peopleToCreate = [
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
      { firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com' }
    ];
    
    const createdPeople = await Promise.all(
      peopleToCreate.map(person => 
        peopleApi.createPerson({
          personRequest: {
            ...person,
            enabled: true,
            credentialsNumber: Math.random().toString(36).substr(2, 9)
          }
        })
      )
    );
    
    console.log(`Created ${createdPeople.length} people`);
    
    // Add them to a group
    const groupId = 123; // Assuming this group exists
    await Promise.all(
      createdPeople.map(person =>
        peopleApi.addPersonToGroup({
          personId: person.id,
          groupId
        })
      )
    );
    
    console.log('All people added to group');
    
  } catch (error) {
    console.error('Error in batch operations:', error);
  }
}

// Run examples
async function main() {
  await listPeople();
  await createPerson();
  await manageDoorAccess();
  await monitorEvents();
  await batchOperations();
}

main().catch(console.error);