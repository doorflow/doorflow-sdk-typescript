# GroupsApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listGroups**](GroupsApi.md#listgroups) | **GET** /api/3/groups | List groups |



## listGroups

> Array&lt;Group&gt; listGroups()

List groups

Returns a list of all groups accessible to the authenticated user, ordered by name. Groups are collections of people that can be assigned to roles for access control. Groups can be static (manually assigned) or dynamic (based on LDAP/directory queries). This endpoint does not support pagination. 

### Example

```ts
import {
  Configuration,
  GroupsApi,
} from '@doorflow/api';
import type { ListGroupsRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupsApi(config);

  try {
    const data = await api.listGroups();
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

[**Array&lt;Group&gt;**](Group.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of groups retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

