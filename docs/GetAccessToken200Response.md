
# GetAccessToken200Response


## Properties

Name | Type
------------ | -------------
`accessToken` | string
`tokenType` | string
`expiresIn` | number
`refreshToken` | string
`scope` | string
`createdAt` | number

## Example

```typescript
import type { GetAccessToken200Response } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "accessToken": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...,
  "tokenType": Bearer,
  "expiresIn": 3600,
  "refreshToken": refresh_token_here,
  "scope": account.person.readonly account.channel.readonly,
  "createdAt": 1704067200,
} satisfies GetAccessToken200Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetAccessToken200Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


