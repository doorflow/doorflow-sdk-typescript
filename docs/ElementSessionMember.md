
# ElementSessionMember


## Properties

Name | Type
------------ | -------------
`externalId` | string
`name` | string
`email` | string

## Example

```typescript
import type { ElementSessionMember } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "externalId": u_42,
  "name": Alice Smith,
  "email": alice@example.com,
} satisfies ElementSessionMember

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ElementSessionMember
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


