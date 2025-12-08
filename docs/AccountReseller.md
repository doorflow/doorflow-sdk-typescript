
# AccountReseller

Reseller information if account has an associated reseller

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`supportContact` | string
`supportEmail` | string
`supportTelephone` | string

## Example

```typescript
import type { AccountReseller } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "supportContact": null,
  "supportEmail": null,
  "supportTelephone": null,
} satisfies AccountReseller

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountReseller
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


