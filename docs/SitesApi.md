# SitesApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listSites**](SitesApi.md#listsites) | **GET** /api/3/sites | List sites |



## listSites

> Array&lt;Site&gt; listSites(perPage, page, skipPagination)

List sites

Returns a paginated list of sites (physical locations) accessible to the authenticated user. Sites are used to organize channels (door controllers) by physical location and can have their own time zones and IP address ranges. 

### Example

```ts
import {
  Configuration,
  SitesApi,
} from '@doorflow/api';
import type { ListSitesRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new SitesApi(config);

  const body = {
    // number | Number of results per page (optional)
    perPage: 56,
    // number | Page number for pagination (optional)
    page: 56,
    // boolean | Skip pagination and return all results (optional)
    skipPagination: true,
  } satisfies ListSitesRequest;

  try {
    const data = await api.listSites(body);
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
| **perPage** | `number` | Number of results per page | [Optional] [Defaults to `500`] |
| **page** | `number` | Page number for pagination | [Optional] [Defaults to `1`] |
| **skipPagination** | `boolean` | Skip pagination and return all results | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Site&gt;**](Site.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of sites retrieved successfully |  * Total - Total number of records <br>  * Per-Page - Number of records per page <br>  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

