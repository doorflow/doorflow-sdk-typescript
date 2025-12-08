
# Group


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`notes` | string
`globalAcrossSites` | boolean
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Group } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 15,
  "name": Marketing Team,
  "notes": Access to marketing floor and conference rooms,
  "globalAcrossSites": false,
  "createdAt": null,
  "updatedAt": null,
} satisfies Group

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Group
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


