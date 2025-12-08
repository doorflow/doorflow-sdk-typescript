
# CredentialInput


## Properties

Name | Type
------------ | -------------
`personCredential` | [CredentialInputPersonCredential](CredentialInputPersonCredential.md)

## Example

```typescript
import type { CredentialInput } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "personCredential": null,
} satisfies CredentialInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CredentialInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


