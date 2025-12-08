
# ReservationInput


## Properties

Name | Type
------------ | -------------
`personId` | number
`startTime` | Date
`endTime` | Date
`channelIds` | Array&lt;number&gt;
`doorControllerIds` | Array&lt;number&gt;

## Example

```typescript
import type { ReservationInput } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "personId": 12345,
  "startTime": 2024-01-15T09:00Z,
  "endTime": 2024-01-15T17:00Z,
  "channelIds": [1340,1341],
  "doorControllerIds": [1340,1341],
} satisfies ReservationInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReservationInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


