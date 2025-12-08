# CredentialsApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCredential**](CredentialsApi.md#createcredential) | **POST** /api/3/people/{person_id}/credentials | Create credential |
| [**deleteCredential**](CredentialsApi.md#deletecredential) | **DELETE** /api/3/people/{person_id}/credentials/{id} | Delete credential |
| [**getCredential**](CredentialsApi.md#getcredential) | **GET** /api/3/people/{person_id}/credentials/{id} | Get credential details |
| [**listAllCredentials**](CredentialsApi.md#listallcredentials) | **GET** /api/3/credentials | List all credentials |
| [**listPersonCredentials**](CredentialsApi.md#listpersoncredentials) | **GET** /api/3/people/{person_id}/credentials | List person credentials |
| [**updateCredential**](CredentialsApi.md#updatecredential) | **PUT** /api/3/people/{person_id}/credentials/{id} | Update credential |



## createCredential

> Credential createCredential(personId, credentialInput)

Create credential

Creates a new credential for a person. For HID Mobile Access and PassFlow credentials, this initiates an invitation process.

### Example

```ts
import {
  Configuration,
  CredentialsApi,
} from '@doorflow/api';
import type { CreateCredentialRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CredentialsApi(config);

  const body = {
    // number | Person ID
    personId: 56,
    // CredentialInput
    credentialInput: ...,
  } satisfies CreateCredentialRequest;

  try {
    const data = await api.createCredential(body);
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
| **personId** | `number` | Person ID | [Defaults to `undefined`] |
| **credentialInput** | [CredentialInput](CredentialInput.md) |  | |

### Return type

[**Credential**](Credential.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Credential created successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **409** | Conflict - Credential already exists for this credential type |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCredential

> string deleteCredential(personId, id)

Delete credential

Deletes a credential. For HID Mobile Access credentials, this deactivates the mobile credential.

### Example

```ts
import {
  Configuration,
  CredentialsApi,
} from '@doorflow/api';
import type { DeleteCredentialRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CredentialsApi(config);

  const body = {
    // number | Person ID
    personId: 56,
    // string | Credential ID (hashid) or HID invitation ID (format 99xxxxxxxx)
    id: id_example,
  } satisfies DeleteCredentialRequest;

  try {
    const data = await api.deleteCredential(body);
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
| **personId** | `number` | Person ID | [Defaults to `undefined`] |
| **id** | `string` | Credential ID (hashid) or HID invitation ID (format 99xxxxxxxx) | [Defaults to `undefined`] |

### Return type

**string**

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Credential deleted successfully (value-assignable credentials) |  -  |
| **202** | Credential deletion accepted (mobile credentials processing asynchronously) |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCredential

> Credential getCredential(personId, id, callback, ackToken)

Get credential details

Returns details for a specific credential

### Example

```ts
import {
  Configuration,
  CredentialsApi,
} from '@doorflow/api';
import type { GetCredentialRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CredentialsApi(config);

  const body = {
    // number | Person ID
    personId: 56,
    // string | Credential ID (hashid) or HID invitation ID (format 99xxxxxxxx)
    id: id_example,
    // string | Webhook callback ID for acknowledgment (optional)
    callback: callback_example,
    // string | Webhook acknowledgment token (optional)
    ackToken: ackToken_example,
  } satisfies GetCredentialRequest;

  try {
    const data = await api.getCredential(body);
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
| **personId** | `number` | Person ID | [Defaults to `undefined`] |
| **id** | `string` | Credential ID (hashid) or HID invitation ID (format 99xxxxxxxx) | [Defaults to `undefined`] |
| **callback** | `string` | Webhook callback ID for acknowledgment | [Optional] [Defaults to `undefined`] |
| **ackToken** | `string` | Webhook acknowledgment token | [Optional] [Defaults to `undefined`] |

### Return type

[**Credential**](Credential.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Credential details retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listAllCredentials

> Array&lt;Credential&gt; listAllCredentials(perPage, page, skipPagination)

List all credentials

Returns a paginated list of all credentials accessible to the authenticated user

### Example

```ts
import {
  Configuration,
  CredentialsApi,
} from '@doorflow/api';
import type { ListAllCredentialsRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CredentialsApi(config);

  const body = {
    // number | Number of results per page (optional)
    perPage: 56,
    // number | Page number for pagination (optional)
    page: 56,
    // boolean | Skip pagination and return all results (optional)
    skipPagination: true,
  } satisfies ListAllCredentialsRequest;

  try {
    const data = await api.listAllCredentials(body);
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

[**Array&lt;Credential&gt;**](Credential.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of credentials retrieved successfully |  * Total - Total number of records <br>  * Per-Page - Number of records per page <br>  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listPersonCredentials

> Array&lt;Credential&gt; listPersonCredentials(personId, perPage, page, skipPagination)

List person credentials

Returns a paginated list of credentials for a specific person, or all credentials if no person_id is provided

### Example

```ts
import {
  Configuration,
  CredentialsApi,
} from '@doorflow/api';
import type { ListPersonCredentialsRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CredentialsApi(config);

  const body = {
    // number | Person ID
    personId: 56,
    // number | Number of results per page (optional)
    perPage: 56,
    // number | Page number for pagination (optional)
    page: 56,
    // boolean | Skip pagination and return all results (optional)
    skipPagination: true,
  } satisfies ListPersonCredentialsRequest;

  try {
    const data = await api.listPersonCredentials(body);
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
| **personId** | `number` | Person ID | [Defaults to `undefined`] |
| **perPage** | `number` | Number of results per page | [Optional] [Defaults to `500`] |
| **page** | `number` | Page number for pagination | [Optional] [Defaults to `1`] |
| **skipPagination** | `boolean` | Skip pagination and return all results | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Credential&gt;**](Credential.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of credentials retrieved successfully |  * Total - Total number of records <br>  * Per-Page - Number of records per page <br>  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateCredential

> Credential updateCredential(personId, id, credentialUpdateInput)

Update credential

Updates the value of an existing credential

### Example

```ts
import {
  Configuration,
  CredentialsApi,
} from '@doorflow/api';
import type { UpdateCredentialRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CredentialsApi(config);

  const body = {
    // number | Person ID
    personId: 56,
    // string | Credential ID (hashid)
    id: id_example,
    // CredentialUpdateInput
    credentialUpdateInput: ...,
  } satisfies UpdateCredentialRequest;

  try {
    const data = await api.updateCredential(body);
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
| **personId** | `number` | Person ID | [Defaults to `undefined`] |
| **id** | `string` | Credential ID (hashid) | [Defaults to `undefined`] |
| **credentialUpdateInput** | [CredentialUpdateInput](CredentialUpdateInput.md) |  | |

### Return type

[**Credential**](Credential.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Credential updated successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

