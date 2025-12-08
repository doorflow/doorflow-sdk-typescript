
# AccountSync

Synchronization status information

## Properties

Name | Type
------------ | -------------
`status` | string
`lastSync` | Date
`description` | string

## Example

```typescript
import type { AccountSync } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "status": null,
  "lastSync": null,
  "description": null,
} satisfies AccountSync

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountSync
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


