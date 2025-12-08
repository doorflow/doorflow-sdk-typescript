
# NotificationRuleConditionsInner


## Properties

Name | Type
------------ | -------------
`type` | string
`typeDescription` | string
`value` | string

## Example

```typescript
import type { NotificationRuleConditionsInner } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "type": door_controller_id,
  "typeDescription": Door Controller,
  "value": 1340,
} satisfies NotificationRuleConditionsInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NotificationRuleConditionsInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


