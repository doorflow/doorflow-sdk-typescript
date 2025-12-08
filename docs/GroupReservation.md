
# GroupReservation


## Properties

Name | Type
------------ | -------------
`id` | number
`personId` | number
`startTime` | Date
`endTime` | Date
`state` | string
`groupIds` | Array&lt;number&gt;
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { GroupReservation } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 456,
  "personId": 12345,
  "startTime": 2024-01-15T09:00Z,
  "endTime": 2024-01-15T17:00Z,
  "state": active,
  "groupIds": [1,3,5],
  "createdAt": null,
  "updatedAt": null,
} satisfies GroupReservation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GroupReservation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


