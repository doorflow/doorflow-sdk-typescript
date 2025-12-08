# SyncApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**initiateSync**](SyncApi.md#initiatesync) | **POST** /api/3/sync | Initiate sync |



## initiateSync

> DeleteGroupReservation200Response initiateSync()

Initiate sync

Triggers a synchronization process to push pending changes to all door controllers. This endpoint initiates the sync if there are unsynced changes in the account. The sync process is rate-limited to prevent excessive sync requests. 

### Example

```ts
import {
  Configuration,
  SyncApi,
} from '@doorflow/api';
import type { InitiateSyncRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new SyncApi(config);

  try {
    const data = await api.initiateSync();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**DeleteGroupReservation200Response**](DeleteGroupReservation200Response.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sync initiated successfully (or no changes to sync) |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **429** | Too Many Requests - Sync rate limit exceeded |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

