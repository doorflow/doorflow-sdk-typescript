
# CardDesignImageBack

Back image URLs at multiple sizes, or null if no image is set

## Properties

Name | Type
------------ | -------------
`original` | string
`medium` | string
`small` | string
`thumb` | string

## Example

```typescript
import type { CardDesignImageBack } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "original": null,
  "medium": null,
  "small": null,
  "thumb": null,
} satisfies CardDesignImageBack

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CardDesignImageBack
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


