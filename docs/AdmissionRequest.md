
# AdmissionRequest


## Properties

Name | Type
------------ | -------------
`id` | number
`status` | string
`channelId` | number
`personId` | number
`requestedAt` | Date
`completedAt` | Date
`doorController` | [AdmissionRequestDoorController](AdmissionRequestDoorController.md)
`person` | [AdmissionRequestPerson](AdmissionRequestPerson.md)

## Example

```typescript
import type { AdmissionRequest } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 123456789,
  "status": admitted,
  "channelId": 1340,
  "personId": 12345,
  "requestedAt": 2024-01-15T14:30Z,
  "completedAt": 2024-01-15T14:30:02.500Z,
  "doorController": null,
  "person": null,
} satisfies AdmissionRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdmissionRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


