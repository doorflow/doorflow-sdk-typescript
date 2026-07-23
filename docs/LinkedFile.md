
# LinkedFile


## Properties

Name | Type
------------ | -------------
`uuid` | string
`entityType` | string
`entityUuid` | string
`fileRole` | string
`url` | string
`contentType` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { LinkedFile } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "uuid": null,
  "entityType": null,
  "entityUuid": null,
  "fileRole": null,
  "url": null,
  "contentType": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies LinkedFile

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LinkedFile
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


