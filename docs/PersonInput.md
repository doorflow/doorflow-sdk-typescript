
# PersonInput


## Properties

Name | Type
------------ | -------------
`firstName` | string
`lastName` | string
`salutation` | string
`jobTitle` | string
`email` | string
`department` | string
`enabled` | boolean
`validFrom` | Date
`validTo` | Date
`imageBase64` | string
`imageRemoteUrl` | string
`telephone` | string
`mobile` | string
`notes` | string
`barcode` | string
`systemId` | string
`organisationId` | number
`custom1` | string
`custom2` | string
`custom3` | string
`custom4` | string
`custom5` | string
`groupIds` | Array&lt;number&gt;
`roleIds` | Array&lt;number&gt;
`deleted` | boolean

## Example

```typescript
import type { PersonInput } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "firstName": John,
  "lastName": Doe,
  "salutation": null,
  "jobTitle": null,
  "email": null,
  "department": null,
  "enabled": null,
  "validFrom": null,
  "validTo": null,
  "imageBase64": null,
  "imageRemoteUrl": null,
  "telephone": null,
  "mobile": +14155551234,
  "notes": null,
  "barcode": null,
  "systemId": null,
  "organisationId": null,
  "custom1": null,
  "custom2": null,
  "custom3": null,
  "custom4": null,
  "custom5": null,
  "groupIds": [1,3,5],
  "roleIds": [2,4],
  "deleted": null,
} satisfies PersonInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


