
# Account


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`timeZone` | string
`monitored` | boolean
`reseller` | [AccountReseller](AccountReseller.md)
`sync` | [AccountSync](AccountSync.md)
`user` | [AccountUser](AccountUser.md)
`passport` | [AccountPassport](AccountPassport.md)

## Example

```typescript
import type { Account } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": abc123xyz,
  "name": Acme Corporation,
  "timeZone": America/New_York,
  "monitored": true,
  "reseller": null,
  "sync": null,
  "user": null,
  "passport": null,
} satisfies Account

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Account
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


