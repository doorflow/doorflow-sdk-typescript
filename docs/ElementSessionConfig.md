
# ElementSessionConfig

Theme and widget-configuration flags. Each value is validated on the server; invalid values fall back to defaults rather than rejecting the session. 

## Properties

Name | Type
------------ | -------------
`theme` | string
`accentColor` | string
`borderRadius` | number
`fontFamily` | string
`manageGroups` | boolean
`showMember` | boolean

## Example

```typescript
import type { ElementSessionConfig } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "theme": null,
  "accentColor": #FF6600,
  "borderRadius": null,
  "fontFamily": Inter, -apple-system, sans-serif,
  "manageGroups": null,
  "showMember": null,
} satisfies ElementSessionConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ElementSessionConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


