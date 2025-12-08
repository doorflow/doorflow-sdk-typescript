
# CredentialType


## Properties

Name | Type
------------ | -------------
`id` | number
`label` | string
`slug` | string
`code` | number

## Example

```typescript
import type { CredentialType } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 5,
  "label": Employee Card,
  "slug": employee_card,
  "code": 100,
} satisfies CredentialType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CredentialType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


