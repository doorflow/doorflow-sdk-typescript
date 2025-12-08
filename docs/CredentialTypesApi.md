# CredentialTypesApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listCredentialTypes**](CredentialTypesApi.md#listcredentialtypes) | **GET** /api/3/credential_types | List credential types |



## listCredentialTypes

> Array&lt;CredentialType&gt; listCredentialTypes(perPage, page, skipPagination)

List credential types

Returns a paginated list of credential types configured for the authenticated user\&#39;s account. Credential types define the formats and types of credentials (cards, PINs, mobile access, etc.) that can be used. Each credential type is based on a global credential type and can be customized per account. 

### Example

```ts
import {
  Configuration,
  CredentialTypesApi,
} from '@doorflow/api';
import type { ListCredentialTypesRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CredentialTypesApi(config);

  const body = {
    // number | Number of results per page (optional)
    perPage: 56,
    // number | Page number for pagination (optional)
    page: 56,
    // boolean | Skip pagination and return all results (optional)
    skipPagination: true,
  } satisfies ListCredentialTypesRequest;

  try {
    const data = await api.listCredentialTypes(body);
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

[**Array&lt;CredentialType&gt;**](CredentialType.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of credential types retrieved successfully |  * Total - Total number of records <br>  * Per-Page - Number of records per page <br>  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

