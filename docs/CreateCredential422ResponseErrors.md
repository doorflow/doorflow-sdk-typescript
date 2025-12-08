
# CreateCredential422ResponseErrors

Field-specific validation errors

## Properties

Name | Type
------------ | -------------
`value` | Array&lt;string&gt;
`credentialTypeId` | Array&lt;string&gt;
`limitReached` | string

## Example

```typescript
import type { CreateCredential422ResponseErrors } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "value": ["value is already in use on your account","must be between 4 and 7 digits in length"],
  "credentialTypeId": ["Not found for this account"],
  "limitReached": You have reached your HID Mobile licence limit. Please contact DoorFlow Support.,
} satisfies CreateCredential422ResponseErrors

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateCredential422ResponseErrors
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


