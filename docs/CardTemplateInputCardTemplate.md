
# CardTemplateInputCardTemplate


## Properties

Name | Type
------------ | -------------
`uuid` | string
`name` | string
`templateTypeId` | number
`templateTypeCode` | string
`cardType` | string
`doubleSided` | boolean
`orientationFront` | string
`orientationBack` | string
`defaultTemplate` | boolean
`templateObjects` | Array&lt;object&gt;
`editableBy` | string
`ownerId` | number
`deletedAt` | Date
`changeRequestId` | string

## Example

```typescript
import type { CardTemplateInputCardTemplate } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "uuid": null,
  "name": null,
  "templateTypeId": null,
  "templateTypeCode": ISO_CARD_STANDARD,
  "cardType": null,
  "doubleSided": null,
  "orientationFront": null,
  "orientationBack": null,
  "defaultTemplate": null,
  "templateObjects": null,
  "editableBy": null,
  "ownerId": null,
  "deletedAt": null,
  "changeRequestId": null,
} satisfies CardTemplateInputCardTemplate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CardTemplateInputCardTemplate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


