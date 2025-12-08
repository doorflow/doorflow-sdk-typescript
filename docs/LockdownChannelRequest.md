
# LockdownChannelRequest


## Properties

Name | Type
------------ | -------------
`cardLockdown` | boolean
`rexLockdown` | boolean
`auxLockdown` | boolean

## Example

```typescript
import type { LockdownChannelRequest } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "cardLockdown": true,
  "rexLockdown": false,
  "auxLockdown": false,
} satisfies LockdownChannelRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LockdownChannelRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


