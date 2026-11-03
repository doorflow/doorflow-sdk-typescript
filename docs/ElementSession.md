
# ElementSession


## Properties

Name | Type
------------ | -------------
`token` | string
`expiresIn` | number

## Example

```typescript
import type { ElementSession } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "token": eyJhbGciOiJIUzI1NiJ9...,
  "expiresIn": 900,
} satisfies ElementSession

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ElementSession
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


