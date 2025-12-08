
# Event


## Properties

Name | Type
------------ | -------------
`id` | number
`eventId` | number
`eventCode` | number
`eventLabel` | string
`doorControllerId` | number
`doorControllerName` | string
`channelId` | number
`channelName` | string
`personId` | number
`personName` | string
`credentialsNumber` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Event } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 123456789,
  "eventId": 123456789,
  "eventCode": 10,
  "eventLabel": John Doe admitted using card,
  "doorControllerId": 1340,
  "doorControllerName": Front Door,
  "channelId": 1340,
  "channelName": Front Door,
  "personId": 12345,
  "personName": John Doe,
  "credentialsNumber": 1234567890,
  "createdAt": 2024-01-15T14:30Z,
  "updatedAt": 2024-01-15T14:30Z,
} satisfies Event

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Event
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


