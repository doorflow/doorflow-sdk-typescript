# ElementSessionsApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createElementSession**](ElementSessionsApi.md#createelementsession) | **POST** /api/3/element_sessions | Create an Elements widget session |



## createElementSession

> ElementSession createElementSession(elementSessionInput)

Create an Elements widget session

Mints a short-lived JWT session token authorising one Elements widget instance for one identified subject. The token is delivered to the widget shell via the host page or app, then forwarded to DoorFlow. Tokens expire after 15 minutes; long-lived widgets refresh by calling this endpoint again from the host backend.  The &#x60;member&#x60; block is the integrator\&#39;s CRM-side identity for the person; DoorFlow find-or-creates a &#x60;Person&#x60; against &#x60;external_id&#x60; on the authenticated account. 

### Example

```ts
import {
  Configuration,
  ElementSessionsApi,
} from '@doorflow/api';
import type { CreateElementSessionRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ElementSessionsApi(config);

  const body = {
    // ElementSessionInput
    elementSessionInput: ...,
  } satisfies CreateElementSessionRequest;

  try {
    const data = await api.createElementSession(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **elementSessionInput** | [ElementSessionInput](ElementSessionInput.md) |  | |

### Return type

[**ElementSession**](ElementSession.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Session token minted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **422** | Session could not be minted — typed error in the response body |  -  |
| **503** | Identity-assertion verification could not complete because the partner JWKS endpoint was unreachable |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

