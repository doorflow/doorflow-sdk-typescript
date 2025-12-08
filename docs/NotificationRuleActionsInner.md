
# NotificationRuleActionsInner


## Properties

Name | Type
------------ | -------------
`type` | number
`typeDescription` | string
`data` | string

## Example

```typescript
import type { NotificationRuleActionsInner } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "type": 0,
  "typeDescription": Callback URL,
  "data": https://example.com/webhook,
} satisfies NotificationRuleActionsInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NotificationRuleActionsInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


