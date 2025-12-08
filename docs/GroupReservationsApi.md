# GroupReservationsApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createGroupReservation**](GroupReservationsApi.md#creategroupreservation) | **POST** /api/3/group_reservations | Create group reservation |
| [**deleteGroupReservation**](GroupReservationsApi.md#deletegroupreservation) | **DELETE** /api/3/group_reservations/{id} | Delete group reservation |
| [**listGroupReservations**](GroupReservationsApi.md#listgroupreservations) | **GET** /api/3/group_reservations | List group reservations |



## createGroupReservation

> GroupReservation createGroupReservation(groupReservationInput)

Create group reservation

Creates a new group reservation to temporarily assign a person to one or more groups. The person will be automatically added to the specified groups during the reservation period. 

### Example

```ts
import {
  Configuration,
  GroupReservationsApi,
} from '@doorflow/api';
import type { CreateGroupReservationRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupReservationsApi(config);

  const body = {
    // GroupReservationInput
    groupReservationInput: ...,
  } satisfies CreateGroupReservationRequest;

  try {
    const data = await api.createGroupReservation(body);
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
| **groupReservationInput** | [GroupReservationInput](GroupReservationInput.md) |  | |

### Return type

[**GroupReservation**](GroupReservation.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Group reservation created successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteGroupReservation

> DeleteGroupReservation200Response deleteGroupReservation(id)

Delete group reservation

Deletes or deactivates a group reservation. If the reservation is pending (not yet started), it will be permanently deleted. If it\&#39;s already active, it will be deactivated and the person will be removed from the assigned groups. 

### Example

```ts
import {
  Configuration,
  GroupReservationsApi,
} from '@doorflow/api';
import type { DeleteGroupReservationRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupReservationsApi(config);

  const body = {
    // number | Group reservation ID
    id: 56,
  } satisfies DeleteGroupReservationRequest;

  try {
    const data = await api.deleteGroupReservation(body);
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
| **id** | `number` | Group reservation ID | [Defaults to `undefined`] |

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
| **200** | Group reservation deleted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listGroupReservations

> Array&lt;GroupReservation&gt; listGroupReservations(since, sinceUtc, perPage, page, skipPagination)

List group reservations

Returns a paginated list of present and future group reservations. Group reservations temporarily assign people to groups for a specified time period. Supports incremental sync via &#x60;since&#x60; or &#x60;since_utc&#x60; parameters. 

### Example

```ts
import {
  Configuration,
  GroupReservationsApi,
} from '@doorflow/api';
import type { ListGroupReservationsRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupReservationsApi(config);

  const body = {
    // Date | Return only group reservations updated since this timestamp (local time) (optional)
    since: 2013-10-20T19:20:30+01:00,
    // Date | Return only group reservations updated since this timestamp (UTC) (optional)
    sinceUtc: 2013-10-20T19:20:30+01:00,
    // number | Number of results per page (optional)
    perPage: 56,
    // number | Page number for pagination (optional)
    page: 56,
    // boolean | Skip pagination and return all results (optional)
    skipPagination: true,
  } satisfies ListGroupReservationsRequest;

  try {
    const data = await api.listGroupReservations(body);
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
| **since** | `Date` | Return only group reservations updated since this timestamp (local time) | [Optional] [Defaults to `undefined`] |
| **sinceUtc** | `Date` | Return only group reservations updated since this timestamp (UTC) | [Optional] [Defaults to `undefined`] |
| **perPage** | `number` | Number of results per page | [Optional] [Defaults to `500`] |
| **page** | `number` | Page number for pagination | [Optional] [Defaults to `1`] |
| **skipPagination** | `boolean` | Skip pagination and return all results | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;GroupReservation&gt;**](GroupReservation.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of group reservations retrieved successfully |  * Total - Total number of records <br>  * Per-Page - Number of records per page <br>  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

