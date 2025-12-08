
# ChannelLockdown

Lockdown mode configuration (null if not in lockdown)

## Properties

Name | Type
------------ | -------------
`message` | string
`cardLockdown` | [ChannelLockdownCardLockdown](ChannelLockdownCardLockdown.md)
`rexLockdown` | [ChannelLockdownRexLockdown](ChannelLockdownRexLockdown.md)
`auxLockdown` | [ChannelLockdownAuxLockdown](ChannelLockdownAuxLockdown.md)

## Example

```typescript
import type { ChannelLockdown } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "message": Cards and PINs will be rejected,
  "cardLockdown": null,
  "rexLockdown": null,
  "auxLockdown": null,
} satisfies ChannelLockdown

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ChannelLockdown
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


