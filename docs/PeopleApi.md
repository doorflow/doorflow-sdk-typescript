# PeopleApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPerson**](PeopleApi.md#createperson) | **POST** /api/3/people | Create person |
| [**deletePerson**](PeopleApi.md#deleteperson) | **DELETE** /api/3/people/{id} | Delete person |
| [**getPerson**](PeopleApi.md#getperson) | **GET** /api/3/people/{id} | Get person details |
| [**listPeople**](PeopleApi.md#listpeople) | **GET** /api/3/people | List people |
| [**updatePerson**](PeopleApi.md#updateperson) | **PUT** /api/3/people/{id} | Update person |



## createPerson

> Person createPerson(personInput)

Create person

Creates a new person record with optional group and role assignments

### Example

```ts
import {
  Configuration,
  PeopleApi,
} from '@doorflow/api';
import type { CreatePersonRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new PeopleApi(config);

  const body = {
    // PersonInput
    personInput: ...,
  } satisfies CreatePersonRequest;

  try {
    const data = await api.createPerson(body);
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
| **personInput** | [PersonInput](PersonInput.md) |  | |

### Return type

[**Person**](Person.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Person created successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deletePerson

> DeleteGroupReservation200Response deletePerson(id)

Delete person

Soft-deletes a person record. This removes them from the system but retains audit trail.

### Example

```ts
import {
  Configuration,
  PeopleApi,
} from '@doorflow/api';
import type { DeletePersonRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new PeopleApi(config);

  const body = {
    // number | Person ID
    id: 56,
  } satisfies DeletePersonRequest;

  try {
    const data = await api.deletePerson(body);
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
| **id** | `number` | Person ID | [Defaults to `undefined`] |

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
| **200** | Person deleted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPerson

> Person getPerson(id)

Get person details

Returns details for a specific person

### Example

```ts
import {
  Configuration,
  PeopleApi,
} from '@doorflow/api';
import type { GetPersonRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new PeopleApi(config);

  const body = {
    // number | Person ID
    id: 56,
  } satisfies GetPersonRequest;

  try {
    const data = await api.getPerson(body);
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
| **id** | `number` | Person ID | [Defaults to `undefined`] |

### Return type

[**Person**](Person.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Person details retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listPeople

> Array&lt;Person&gt; listPeople(email, systemId, since, sinceUtc, perPage, page, skipPagination)

List people

Returns a paginated list of people accessible to the authenticated user. Supports incremental sync via &#x60;since&#x60; or &#x60;since_utc&#x60; parameters.

### Example

```ts
import {
  Configuration,
  PeopleApi,
} from '@doorflow/api';
import type { ListPeopleRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new PeopleApi(config);

  const body = {
    // string | Filter by email (case-insensitive partial match) (optional)
    email: email_example,
    // string | Filter by organisation system ID (optional)
    systemId: systemId_example,
    // Date | Return only people updated since this timestamp (local time) (optional)
    since: 2013-10-20T19:20:30+01:00,
    // Date | Return only people updated since this timestamp (UTC) (optional)
    sinceUtc: 2013-10-20T19:20:30+01:00,
    // number | Number of results per page (optional)
    perPage: 56,
    // number | Page number for pagination (optional)
    page: 56,
    // boolean | Skip pagination and return all results (optional)
    skipPagination: true,
  } satisfies ListPeopleRequest;

  try {
    const data = await api.listPeople(body);
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
| **email** | `string` | Filter by email (case-insensitive partial match) | [Optional] [Defaults to `undefined`] |
| **systemId** | `string` | Filter by organisation system ID | [Optional] [Defaults to `undefined`] |
| **since** | `Date` | Return only people updated since this timestamp (local time) | [Optional] [Defaults to `undefined`] |
| **sinceUtc** | `Date` | Return only people updated since this timestamp (UTC) | [Optional] [Defaults to `undefined`] |
| **perPage** | `number` | Number of results per page | [Optional] [Defaults to `50`] |
| **page** | `number` | Page number for pagination | [Optional] [Defaults to `1`] |
| **skipPagination** | `boolean` | Skip pagination and return all results | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Person&gt;**](Person.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of people retrieved successfully |  * Total - Total number of records <br>  * Per-Page - Number of records per page <br>  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updatePerson

> Person updatePerson(id, personInput)

Update person

Updates an existing person record. Can modify group and role assignments. Setting &#x60;image_remote_url&#x60; to empty string will delete the image.

### Example

```ts
import {
  Configuration,
  PeopleApi,
} from '@doorflow/api';
import type { UpdatePersonRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new PeopleApi(config);

  const body = {
    // number | Person ID
    id: 56,
    // PersonInput
    personInput: ...,
  } satisfies UpdatePersonRequest;

  try {
    const data = await api.updatePerson(body);
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
| **id** | `number` | Person ID | [Defaults to `undefined`] |
| **personInput** | [PersonInput](PersonInput.md) |  | |

### Return type

[**Person**](Person.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Person updated successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

