
# CardDesignInput


## Properties

Name | Type
------------ | -------------
`name` | string
`notes` | string
`imageFrontBase64` | string
`imageBackBase64` | string

## Example

```typescript
import type { CardDesignInput } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "name": Standard Blue Card,
  "notes": null,
  "imageFrontBase64": null,
  "imageBackBase64": null,
} satisfies CardDesignInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CardDesignInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


