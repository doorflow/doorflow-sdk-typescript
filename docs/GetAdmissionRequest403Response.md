
# GetAdmissionRequest403Response


## Properties

Name | Type
------------ | -------------
`error` | string
`errorDescription` | string

## Example

```typescript
import type { GetAdmissionRequest403Response } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "error": forbidden,
  "errorDescription": You are not authorized to access this resource,
} satisfies GetAdmissionRequest403Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetAdmissionRequest403Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


