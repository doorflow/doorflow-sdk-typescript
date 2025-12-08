# ChannelsApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**admitChannel**](ChannelsApi.md#admitchannel) | **POST** /api/3/channels/{id}/admit | Admit through channel (any person) |
| [**admitPerson**](ChannelsApi.md#admitpersonoperation) | **POST** /api/3/channels/{id}/admit_person | Admit specific person through channel |
| [**autoUnlockChannel**](ChannelsApi.md#autounlockchanneloperation) | **POST** /api/3/channels/{id}/auto_unlock | Set auto-unlock shift |
| [**getChannel**](ChannelsApi.md#getchannel) | **GET** /api/3/channels/{id} | Get channel details |
| [**listChannels**](ChannelsApi.md#listchannels) | **GET** /api/3/channels | List channels (door controllers) |
| [**lockdownChannel**](ChannelsApi.md#lockdownchanneloperation) | **POST** /api/3/channels/{id}/lockdown | Enable lockdown mode |
| [**normalChannel**](ChannelsApi.md#normalchannel) | **POST** /api/3/channels/{id}/normal | Return channel to normal mode |
| [**regenerateEncryptionKey**](ChannelsApi.md#regenerateencryptionkey) | **POST** /api/3/channels/{id}/regenerate_encryption_key | Regenerate encryption key |
| [**removeEncryptionKey**](ChannelsApi.md#removeencryptionkey) | **POST** /api/3/channels/{id}/remove_encryption_key | Remove encryption key |
| [**unlockChannel**](ChannelsApi.md#unlockchanneloperation) | **POST** /api/3/channels/{id}/unlock | Unlock channel (unlock mode) |
| [**unlockdownChannel**](ChannelsApi.md#unlockdownchannel) | **POST** /api/3/channels/{id}/unlockdown | Disable lockdown mode |



## admitChannel

> AdmitChannel202Response admitChannel(id)

Admit through channel (any person)

Requests immediate admission through a channel without specifying a person. This creates an admission request that momentarily unlocks the door. Returns an admission_request_id that can be used to track the status via GET /api/3/admission_requests/:id. Only works when the channel is in normal mode (not in unlock mode). 

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { AdmitChannelRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
  } satisfies AdmitChannelRequest;

  try {
    const data = await api.admitChannel(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |

### Return type

[**AdmitChannel202Response**](AdmitChannel202Response.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Admission request accepted and queued |  -  |
| **400** | Bad Request - Channel not in normal mode or request cannot be processed |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## admitPerson

> AdmitPerson202Response admitPerson(id, admitPersonRequest)

Admit specific person through channel

Requests admission for a specific person through a channel. This checks if the person has valid credentials and access rights before admitting. Returns an admission_request_id for tracking via GET /api/3/admission_requests/:id. 

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { AdmitPersonOperationRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
    // AdmitPersonRequest
    admitPersonRequest: ...,
  } satisfies AdmitPersonOperationRequest;

  try {
    const data = await api.admitPerson(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |
| **admitPersonRequest** | [AdmitPersonRequest](AdmitPersonRequest.md) |  | |

### Return type

[**AdmitPerson202Response**](AdmitPerson202Response.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Admission request accepted |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - Person does not have access or is not authorized |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## autoUnlockChannel

> Channel autoUnlockChannel(id, autoUnlockChannelRequest)

Set auto-unlock shift

Configures a shift during which the channel automatically unlocks. Provide a shift_id to enable auto-unlock, or omit it to disable. 

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { AutoUnlockChannelOperationRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
    // AutoUnlockChannelRequest (optional)
    autoUnlockChannelRequest: ...,
  } satisfies AutoUnlockChannelOperationRequest;

  try {
    const data = await api.autoUnlockChannel(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |
| **autoUnlockChannelRequest** | [AutoUnlockChannelRequest](AutoUnlockChannelRequest.md) |  | [Optional] |

### Return type

[**Channel**](Channel.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Auto-unlock configuration updated successfully |  -  |
| **400** | Bad Request - Invalid shift_id |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getChannel

> Channel getChannel(id)

Get channel details

Returns details for a specific channel (door controller)

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { GetChannelRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
  } satisfies GetChannelRequest;

  try {
    const data = await api.getChannel(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |

### Return type

[**Channel**](Channel.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Channel details retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listChannels

> Array&lt;Channel&gt; listChannels(siteId, perPage, page, skipPagination)

List channels (door controllers)

Returns a paginated list of channels (door controllers) accessible to the authenticated user

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { ListChannelsRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Filter channels by site ID (optional)
    siteId: 56,
    // number | Number of results per page (optional)
    perPage: 56,
    // number | Page number for pagination (optional)
    page: 56,
    // boolean | Skip pagination and return all results (optional)
    skipPagination: true,
  } satisfies ListChannelsRequest;

  try {
    const data = await api.listChannels(body);
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
| **siteId** | `number` | Filter channels by site ID | [Optional] [Defaults to `undefined`] |
| **perPage** | `number` | Number of results per page | [Optional] [Defaults to `500`] |
| **page** | `number` | Page number for pagination | [Optional] [Defaults to `1`] |
| **skipPagination** | `boolean` | Skip pagination and return all results | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Channel&gt;**](Channel.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of channels retrieved successfully |  * Total - Total number of records <br>  * Per-Page - Number of records per page <br>  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## lockdownChannel

> Channel lockdownChannel(id, lockdownChannelRequest)

Enable lockdown mode

Puts a channel into lockdown mode, restricting various types of access. You can selectively lock down card access, REX (Request to Exit), and AUX inputs. 

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { LockdownChannelOperationRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
    // LockdownChannelRequest (optional)
    lockdownChannelRequest: ...,
  } satisfies LockdownChannelOperationRequest;

  try {
    const data = await api.lockdownChannel(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |
| **lockdownChannelRequest** | [LockdownChannelRequest](LockdownChannelRequest.md) |  | [Optional] |

### Return type

[**Channel**](Channel.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lockdown mode enabled successfully |  -  |
| **400** | Bad Request - Lockdown command failed |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## normalChannel

> Channel normalChannel(id)

Return channel to normal mode

Cancels unlock mode and returns the channel to normal access control mode

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { NormalChannelRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
  } satisfies NormalChannelRequest;

  try {
    const data = await api.normalChannel(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |

### Return type

[**Channel**](Channel.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Channel returned to normal mode successfully |  -  |
| **400** | Bad Request - Command failed |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## regenerateEncryptionKey

> Channel regenerateEncryptionKey(id)

Regenerate encryption key

Generates a new encryption key for secure communication with the channel

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { RegenerateEncryptionKeyRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
  } satisfies RegenerateEncryptionKeyRequest;

  try {
    const data = await api.regenerateEncryptionKey(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |

### Return type

[**Channel**](Channel.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Encryption key regenerated successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## removeEncryptionKey

> Channel removeEncryptionKey(id)

Remove encryption key

Removes the encryption key, disabling encrypted communication with the channel

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { RemoveEncryptionKeyRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
  } satisfies RemoveEncryptionKeyRequest;

  try {
    const data = await api.removeEncryptionKey(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |

### Return type

[**Channel**](Channel.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Encryption key removed successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## unlockChannel

> Channel unlockChannel(id, unlockChannelRequest)

Unlock channel (unlock mode)

Puts a channel into unlock mode, where the door remains unlocked until a specified time. If no relock_at time is provided, the door remains unlocked until normal mode is restored. 

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { UnlockChannelOperationRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
    // UnlockChannelRequest (optional)
    unlockChannelRequest: ...,
  } satisfies UnlockChannelOperationRequest;

  try {
    const data = await api.unlockChannel(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |
| **unlockChannelRequest** | [UnlockChannelRequest](UnlockChannelRequest.md) |  | [Optional] |

### Return type

[**Channel**](Channel.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Channel unlocked successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## unlockdownChannel

> Channel unlockdownChannel(id)

Disable lockdown mode

Removes lockdown mode from a channel, restoring normal access control

### Example

```ts
import {
  Configuration,
  ChannelsApi,
} from '@doorflow/api';
import type { UnlockdownChannelRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ChannelsApi(config);

  const body = {
    // number | Channel ID
    id: 56,
  } satisfies UnlockdownChannelRequest;

  try {
    const data = await api.unlockdownChannel(body);
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
| **id** | `number` | Channel ID | [Defaults to `undefined`] |

### Return type

[**Channel**](Channel.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lockdown mode disabled successfully |  -  |
| **400** | Bad Request - Unlockdown command failed |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

