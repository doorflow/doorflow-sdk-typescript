
# GetAdmissionRequest500Response


## Properties

Name | Type
------------ | -------------
`error` | string
`errorDescription` | string

## Example

```typescript
import type { GetAdmissionRequest500Response } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "error": internal_server_error,
  "errorDescription": An unexpected error occurred,
} satisfies GetAdmissionRequest500Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetAdmissionRequest500Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


