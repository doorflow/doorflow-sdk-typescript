
# CardTemplate


## Properties

Name | Type
------------ | -------------
`id` | number
`uuid` | string
`name` | string
`templateTypeCode` | string
`cardType` | string
`doubleSided` | boolean
`orientationFront` | string
`orientationBack` | string
`defaultTemplate` | boolean
`backgroundImageFrontUrl` | string
`backgroundImageBackUrl` | string
`templateObjects` | Array&lt;object&gt;
`ownerId` | number
`editableBy` | string
`deletedAt` | Date
`deletedById` | number
`linkedFiles` | [Array&lt;LinkedFile&gt;](LinkedFile.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { CardTemplate } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 42,
  "uuid": 550E8400-E29B-41D4-A716-446655440000,
  "name": Staff Card,
  "templateTypeCode": ISO_CARD,
  "cardType": standard,
  "doubleSided": true,
  "orientationFront": P,
  "orientationBack": L,
  "defaultTemplate": false,
  "backgroundImageFrontUrl": null,
  "backgroundImageBackUrl": null,
  "templateObjects": null,
  "ownerId": null,
  "editableBy": null,
  "deletedAt": null,
  "deletedById": null,
  "linkedFiles": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies CardTemplate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CardTemplate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


