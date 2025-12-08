
# Channel


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`macAddress` | string
`status` | string
`unit` | number
`model` | string
`modelLong` | string
`serialNumber` | string
`cardFormat` | string
`pinFormat` | string
`freescaleVersion` | string
`picVersion` | string
`readerDeviceClassName` | string
`siteId` | number
`updatedAt` | Date
`createdAt` | Date
`sync` | [ChannelSync](ChannelSync.md)
`lockdown` | [ChannelLockdown](ChannelLockdown.md)
`mode` | [ChannelMode](ChannelMode.md)
`autoUnlock` | [ChannelAutoUnlock](ChannelAutoUnlock.md)

## Example

```typescript
import type { Channel } from '@doorflow/api'

// TODO: Update the object below with actual values
const example = {
  "id": 1340,
  "name": Front Door,
  "macAddress": 00:11:22:33:44:55,
  "status": null,
  "unit": 1,
  "model": IPBR-2,
  "modelLong": 2 channel IP Controller,
  "serialNumber": null,
  "cardFormat": null,
  "pinFormat": null,
  "freescaleVersion": null,
  "picVersion": null,
  "readerDeviceClassName": null,
  "siteId": null,
  "updatedAt": null,
  "createdAt": null,
  "sync": null,
  "lockdown": null,
  "mode": null,
  "autoUnlock": null,
} satisfies Channel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Channel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


