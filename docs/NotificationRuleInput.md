
# NotificationRuleInput


## Properties

Name | Type
------------ | -------------
`name` | string
`active` | boolean
`callBackUrl` | string
`matchEventCodes` | Array&lt;number&gt;
`matchControllerIds` | Array&lt;number&gt;

## Example

```typescript
import type { NotificationRuleInput } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "name": Webhook for door access events,
  "active": true,
  "callBackUrl": https://example.com/webhook,
  "matchEventCodes": [10,11,20],
  "matchControllerIds": [1340,1341],
} satisfies NotificationRuleInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NotificationRuleInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


