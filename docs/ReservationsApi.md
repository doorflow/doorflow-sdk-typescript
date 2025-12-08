# ReservationsApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createReservation**](ReservationsApi.md#createreservation) | **POST** /api/3/reservations | Create reservation |
| [**deleteReservation**](ReservationsApi.md#deletereservation) | **DELETE** /api/3/reservations/{id} | Delete reservation |
| [**listReservations**](ReservationsApi.md#listreservations) | **GET** /api/3/reservations | List reservations |



## createReservation

> Reservation createReservation(reservationInput)

Create reservation

Creates a new reservation to grant temporary access to specific channels for a person. The start and end times must fall on the same day in the account\&#39;s time zone. Automatically creates a role and shift for the reservation period. 

### Example

```ts
import {
  Configuration,
  ReservationsApi,
} from '@doorflow/api';
import type { CreateReservationRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ReservationsApi(config);

  const body = {
    // ReservationInput
    reservationInput: ...,
  } satisfies CreateReservationRequest;

  try {
    const data = await api.createReservation(body);
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
| **reservationInput** | [ReservationInput](ReservationInput.md) |  | |

### Return type

[**Reservation**](Reservation.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Reservation created successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteReservation

> DeleteGroupReservation200Response deleteReservation(id)

Delete reservation

Deletes a reservation, removing the temporary access grant. This will also delete the associated role and shift. 

### Example

```ts
import {
  Configuration,
  ReservationsApi,
} from '@doorflow/api';
import type { DeleteReservationRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ReservationsApi(config);

  const body = {
    // number | Reservation ID
    id: 56,
  } satisfies DeleteReservationRequest;

  try {
    const data = await api.deleteReservation(body);
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
| **id** | `number` | Reservation ID | [Defaults to `undefined`] |

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
| **200** | Reservation deleted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listReservations

> Array&lt;Reservation&gt; listReservations(since, sinceUtc, perPage, page, skipPagination)

List reservations

Returns a paginated list of future reservations. Reservations grant temporary access to specific channels (door controllers) for a person within a specified time window. Supports incremental sync via &#x60;since&#x60; or &#x60;since_utc&#x60; parameters. 

### Example

```ts
import {
  Configuration,
  ReservationsApi,
} from '@doorflow/api';
import type { ListReservationsRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ReservationsApi(config);

  const body = {
    // Date | Return only reservations updated since this timestamp (local time) (optional)
    since: 2013-10-20T19:20:30+01:00,
    // Date | Return only reservations updated since this timestamp (UTC) (optional)
    sinceUtc: 2013-10-20T19:20:30+01:00,
    // number | Number of results per page (optional)
    perPage: 56,
    // number | Page number for pagination (optional)
    page: 56,
    // boolean | Skip pagination and return all results (optional)
    skipPagination: true,
  } satisfies ListReservationsRequest;

  try {
    const data = await api.listReservations(body);
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
| **since** | `Date` | Return only reservations updated since this timestamp (local time) | [Optional] [Defaults to `undefined`] |
| **sinceUtc** | `Date` | Return only reservations updated since this timestamp (UTC) | [Optional] [Defaults to `undefined`] |
| **perPage** | `number` | Number of results per page | [Optional] [Defaults to `500`] |
| **page** | `number` | Page number for pagination | [Optional] [Defaults to `1`] |
| **skipPagination** | `boolean` | Skip pagination and return all results | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Reservation&gt;**](Reservation.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of reservations retrieved successfully |  * Total - Total number of records <br>  * Per-Page - Number of records per page <br>  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

