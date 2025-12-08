
# NotificationRule


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`active` | boolean
`conditions` | [Array&lt;NotificationRuleConditionsInner&gt;](NotificationRuleConditionsInner.md)
`events` | [Array&lt;NotificationRuleEventsInner&gt;](NotificationRuleEventsInner.md)
`actions` | [Array&lt;NotificationRuleActionsInner&gt;](NotificationRuleActionsInner.md)

## Example

```typescript
import type { NotificationRule } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 100,
  "name": Webhook for door access events,
  "active": true,
  "conditions": null,
  "events": null,
  "actions": null,
} satisfies NotificationRule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NotificationRule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


