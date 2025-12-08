
# AccountPassport

Mobile access features configuration

## Properties

Name | Type
------------ | -------------
`remoteUnlockEnabled` | boolean
`hidMobileAccess` | boolean

## Example

```typescript
import type { AccountPassport } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "remoteUnlockEnabled": null,
  "hidMobileAccess": null,
} satisfies AccountPassport

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountPassport
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


