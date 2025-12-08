
# GetAdmissionRequest404Response


## Properties

Name | Type
------------ | -------------
`error` | string
`errorDescription` | string

## Example

```typescript
import type { GetAdmissionRequest404Response } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "error": not_found,
  "errorDescription": The requested resource was not found,
} satisfies GetAdmissionRequest404Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetAdmissionRequest404Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


