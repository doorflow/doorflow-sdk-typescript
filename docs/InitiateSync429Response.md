
# InitiateSync429Response


## Properties

Name | Type
------------ | -------------
`error` | string
`description` | string
`retryIn` | number

## Example

```typescript
import type { InitiateSync429Response } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "error": rate_limited,
  "description": Sync rate limit exceeded. Please wait before trying again.,
  "retryIn": 60,
} satisfies InitiateSync429Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as InitiateSync429Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


