
# CardTemplateType


## Properties

Name | Type
------------ | -------------
`code` | string
`name` | string
`pageSize` | string
`widthMm` | number
`heightMm` | number
`orientationDefault` | string
`previewImageUrl` | string
`nonPrintableZones` | [Array&lt;CardTemplateTypeNonPrintableZonesInner&gt;](CardTemplateTypeNonPrintableZonesInner.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { CardTemplateType } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "code": ISO_CARD,
  "name": Standard ISO Card,
  "pageSize": ISO_CARD,
  "widthMm": 85.6,
  "heightMm": 54.0,
  "orientationDefault": L,
  "previewImageUrl": null,
  "nonPrintableZones": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies CardTemplateType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CardTemplateType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


