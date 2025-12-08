# AdmissionRequestsApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAdmissionRequest**](AdmissionRequestsApi.md#getadmissionrequest) | **GET** /api/3/admission_requests/{id} | Get admission request status |



## getAdmissionRequest

> AdmissionRequest getAdmissionRequest(id)

Get admission request status

Returns the status of an admission request created via POST /api/3/channels/:id/admit or POST /api/3/channels/:id/admit_person. Use this to track whether the admission was successful, denied, or is still pending a response from the door controller. 

### Example

```ts
import {
  Configuration,
  AdmissionRequestsApi,
} from '@doorflow/api';
import type { GetAdmissionRequestRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new AdmissionRequestsApi(config);

  const body = {
    // number | Admission request ID (Event ID returned from admit/admit_person endpoints)
    id: 56,
  } satisfies GetAdmissionRequestRequest;

  try {
    const data = await api.getAdmissionRequest(body);
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
| **id** | `number` | Admission request ID (Event ID returned from admit/admit_person endpoints) | [Defaults to `undefined`] |

### Return type

[**AdmissionRequest**](AdmissionRequest.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Admission request status retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

