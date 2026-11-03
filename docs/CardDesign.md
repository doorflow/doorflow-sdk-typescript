
# CardDesign


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`notes` | string
`imageFront` | [CardDesignImageFront](CardDesignImageFront.md)
`imageBack` | [CardDesignImageBack](CardDesignImageBack.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { CardDesign } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 42,
  "name": Standard Blue Card,
  "notes": Used for full-time employees,
  "imageFront": null,
  "imageBack": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies CardDesign

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CardDesign
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


