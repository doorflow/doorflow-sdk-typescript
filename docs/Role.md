
# Role


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`shiftId` | number
`notes` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Role } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 42,
  "name": Office Staff,
  "shiftId": 10,
  "notes": Access to main building during business hours,
  "createdAt": null,
  "updatedAt": null,
} satisfies Role

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Role
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


