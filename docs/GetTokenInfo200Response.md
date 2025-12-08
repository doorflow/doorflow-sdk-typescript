
# GetTokenInfo200Response


## Properties

Name | Type
------------ | -------------
`resourceOwnerId` | number
`accountId` | string
`scope` | Array&lt;string&gt;
`expiresIn` | number
`application` | [GetTokenInfo200ResponseApplication](GetTokenInfo200ResponseApplication.md)
`createdAt` | number

## Example

```typescript
import type { GetTokenInfo200Response } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "resourceOwnerId": 12345,
  "accountId": abc123xyz,
  "scope": ["account.person.readonly","account.channel.readonly"],
  "expiresIn": 7200,
  "application": null,
  "createdAt": 1704067200,
} satisfies GetTokenInfo200Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetTokenInfo200Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


