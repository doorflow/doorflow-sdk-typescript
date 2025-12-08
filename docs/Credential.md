
# Credential


## Properties

Name | Type
------------ | -------------
`id` | string
`credentialTypeId` | number
`label` | string
`personId` | number
`value` | string
`status` | string
`url` | string
`walletType` | string

## Example

```typescript
import type { Credential } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": abc123xyz,
  "credentialTypeId": 5,
  "label": Card Number,
  "personId": 12345,
  "value": 1234567890,
  "status": active,
  "url": null,
  "walletType": null,
} satisfies Credential

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Credential
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


