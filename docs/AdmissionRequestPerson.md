
# AdmissionRequestPerson

Information about the person (null for general admit or if person not found)

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string

## Example

```typescript
import type { AdmissionRequestPerson } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 12345,
  "name": John Doe,
} satisfies AdmissionRequestPerson

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdmissionRequestPerson
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


