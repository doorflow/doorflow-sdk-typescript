
# Site


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`ipAddress` | string
`timeZone` | string
`notes` | string
`siteIps` | [Array&lt;SiteSiteIpsInner&gt;](SiteSiteIpsInner.md)

## Example

```typescript
import type { Site } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 25,
  "name": Main Office,
  "ipAddress": 192.168.1.0/24,
  "timeZone": America/New_York,
  "notes": Corporate headquarters building,
  "siteIps": null,
} satisfies Site

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Site
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


