
# Person


## Properties

Name | Type
------------ | -------------
`id` | number
`firstName` | string
`lastName` | string
`salutation` | string
`jobTitle` | string
`email` | string
`organisationId` | number
`systemId` | string
`department` | string
`enabled` | boolean
`validFrom` | Date
`validTo` | Date
`imageUrl` | string
`imageThumbnailUrl` | string
`telephone` | string
`mobile` | string
`notes` | string
`barcode` | string
`custom1` | string
`custom2` | string
`custom3` | string
`custom4` | string
`custom5` | string
`createdAt` | Date
`updatedAt` | Date
`groups` | Array&lt;number&gt;
`roles` | Array&lt;number&gt;

## Example

```typescript
import type { Person } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 12345,
  "firstName": John,
  "lastName": Doe,
  "salutation": Mr.,
  "jobTitle": Software Engineer,
  "email": john.doe@example.com,
  "organisationId": null,
  "systemId": EMP-12345,
  "department": Engineering,
  "enabled": true,
  "validFrom": null,
  "validTo": null,
  "imageUrl": null,
  "imageThumbnailUrl": null,
  "telephone": null,
  "mobile": +14155551234,
  "notes": null,
  "barcode": null,
  "custom1": null,
  "custom2": null,
  "custom3": null,
  "custom4": null,
  "custom5": null,
  "createdAt": null,
  "updatedAt": null,
  "groups": [1,3,5],
  "roles": [2,4],
} satisfies Person

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Person
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


