# CardTemplatesApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCardTemplate**](CardTemplatesApi.md#createcardtemplate) | **POST** /api/3/card_templates | Create card template |
| [**deleteCardTemplate**](CardTemplatesApi.md#deletecardtemplate) | **DELETE** /api/3/card_templates/{id} | Delete card template (hard-delete) |
| [**deleteCardTemplateBackgroundImage**](CardTemplatesApi.md#deletecardtemplatebackgroundimage) | **DELETE** /api/3/card_templates/{id}/background_image/{side} | Delete background image |
| [**deleteCardTemplateFile**](CardTemplatesApi.md#deletecardtemplatefile) | **DELETE** /api/3/card_templates/{id}/files/{file_uuid} | Delete linked file |
| [**getCardTemplate**](CardTemplatesApi.md#getcardtemplate) | **GET** /api/3/card_templates/{id} | Get card template |
| [**getCardTemplateBackgroundImage**](CardTemplatesApi.md#getcardtemplatebackgroundimage) | **GET** /api/3/card_templates/{id}/background_image/{side} | Get background image |
| [**listCardTemplateFiles**](CardTemplatesApi.md#listcardtemplatefiles) | **GET** /api/3/card_templates/{id}/files | List linked files |
| [**listCardTemplates**](CardTemplatesApi.md#listcardtemplates) | **GET** /api/3/card_templates | List card templates |
| [**updateCardTemplate**](CardTemplatesApi.md#updatecardtemplate) | **PUT** /api/3/card_templates/{id} | Update card template |
| [**updateCardTemplateBackgroundImage**](CardTemplatesApi.md#updatecardtemplatebackgroundimage) | **PUT** /api/3/card_templates/{id}/background_image/{side} | Upload background image |
| [**uploadCardTemplateFile**](CardTemplatesApi.md#uploadcardtemplatefile) | **PUT** /api/3/card_templates/{id}/files/{file_uuid} | Upload or replace linked file |



## createCardTemplate

> CardTemplate createCardTemplate(cardTemplateInput)

Create card template

Creates a new card template. The client should submit a locally generated uuid. The server preserves this and returns the server-assigned id. 

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { CreateCardTemplateRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // CardTemplateInput
    cardTemplateInput: ...,
  } satisfies CreateCardTemplateRequest;

  try {
    const data = await api.createCardTemplate(body);
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
| **cardTemplateInput** | [CardTemplateInput](CardTemplateInput.md) |  | |

### Return type

[**CardTemplate**](CardTemplate.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Card template created successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCardTemplate

> deleteCardTemplate(id)

Delete card template (hard-delete)

Permanently deletes a card template and all associated template elements and background images. The record is removed from the database and cannot be restored. Permitted for any admin in the account.  For a recoverable delete, PATCH &#x60;deleted_at&#x60; instead. 

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { DeleteCardTemplateRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Card template ID
    id: 56,
  } satisfies DeleteCardTemplateRequest;

  try {
    const data = await api.deleteCardTemplate(body);
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
| **id** | `number` | Card template ID | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Card template deleted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCardTemplateBackgroundImage

> deleteCardTemplateBackgroundImage(id, side)

Delete background image

Removes the background image for the specified side.

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { DeleteCardTemplateBackgroundImageRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Card template ID
    id: 56,
    // 'front' | 'back' | Which side of the card
    side: side_example,
  } satisfies DeleteCardTemplateBackgroundImageRequest;

  try {
    const data = await api.deleteCardTemplateBackgroundImage(body);
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
| **id** | `number` | Card template ID | [Defaults to `undefined`] |
| **side** | `front`, `back` | Which side of the card | [Defaults to `undefined`] [Enum: front, back] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Background image deleted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCardTemplateFile

> deleteCardTemplateFile(id, fileUuid)

Delete linked file

Removes a linked file from a card template.

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { DeleteCardTemplateFileRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Card template ID
    id: 56,
    // string | UUID of the linked file
    fileUuid: fileUuid_example,
  } satisfies DeleteCardTemplateFileRequest;

  try {
    const data = await api.deleteCardTemplateFile(body);
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
| **id** | `number` | Card template ID | [Defaults to `undefined`] |
| **fileUuid** | `string` | UUID of the linked file | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Linked file deleted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCardTemplate

> CardTemplate getCardTemplate(id)

Get card template

Returns a single card template by ID including all template elements.

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { GetCardTemplateRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Card template ID
    id: 56,
  } satisfies GetCardTemplateRequest;

  try {
    const data = await api.getCardTemplate(body);
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
| **id** | `number` | Card template ID | [Defaults to `undefined`] |

### Return type

[**CardTemplate**](CardTemplate.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Card template retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCardTemplateBackgroundImage

> getCardTemplateBackgroundImage(id, side)

Get background image

Returns the background image for the specified side. Redirects to the image URL.

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { GetCardTemplateBackgroundImageRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Card template ID
    id: 56,
    // 'front' | 'back' | Which side of the card
    side: side_example,
  } satisfies GetCardTemplateBackgroundImageRequest;

  try {
    const data = await api.getCardTemplateBackgroundImage(body);
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
| **id** | `number` | Card template ID | [Defaults to `undefined`] |
| **side** | `front`, `back` | Which side of the card | [Defaults to `undefined`] [Enum: front, back] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **302** | Redirect to image URL |  -  |
| **404** | Template or image not found |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCardTemplateFiles

> Array&lt;LinkedFile&gt; listCardTemplateFiles(id)

List linked files

Returns all files linked to a card template.

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { ListCardTemplateFilesRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Card template ID
    id: 56,
  } satisfies ListCardTemplateFilesRequest;

  try {
    const data = await api.listCardTemplateFiles(body);
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
| **id** | `number` | Card template ID | [Defaults to `undefined`] |

### Return type

[**Array&lt;LinkedFile&gt;**](LinkedFile.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of linked files retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCardTemplates

> Array&lt;CardTemplate&gt; listCardTemplates(page, perPage, updatedSince, includeDeleted)

List card templates

Returns a paginated list of card templates for the authenticated account. Soft-deleted templates (deleted_at is not null) are excluded by default; pass include_deleted&#x3D;true to include them. 

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { ListCardTemplatesRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Page number (optional)
    page: 56,
    // number | Results per page (optional)
    perPage: 56,
    // Date | ISO 8601 timestamp. Returns only records updated after this time (optional)
    updatedSince: 2013-10-20T19:20:30+01:00,
    // boolean | When true, soft-deleted templates are included in the response. Defaults to false.  (optional)
    includeDeleted: true,
  } satisfies ListCardTemplatesRequest;

  try {
    const data = await api.listCardTemplates(body);
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
| **page** | `number` | Page number | [Optional] [Defaults to `1`] |
| **perPage** | `number` | Results per page | [Optional] [Defaults to `50`] |
| **updatedSince** | `Date` | ISO 8601 timestamp. Returns only records updated after this time | [Optional] [Defaults to `undefined`] |
| **includeDeleted** | `boolean` | When true, soft-deleted templates are included in the response. Defaults to false.  | [Optional] [Defaults to `false`] |

### Return type

[**Array&lt;CardTemplate&gt;**](CardTemplate.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of card templates retrieved successfully |  * X-Current-Page - Current page number <br>  * X-Per-Page - Records per page <br>  * X-Total-Results - Total number of records <br>  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateCardTemplate

> CardTemplate updateCardTemplate(id, cardTemplateInput)

Update card template

Updates an existing card template. Submitting template_objects replaces the entire objects array.  Three special update modes are recognised: - **Soft-delete**: PATCH &#x60;deleted_at&#x60; to a non-null timestamp to   soft-delete (or null to restore). The server records &#x60;deleted_by_id&#x60;   from the authenticated user. Soft-delete is permitted for any admin   in the account, regardless of &#x60;editable_by&#x60; or &#x60;owner_id&#x60;. - **Owner transfer**: PATCH &#x60;owner_id&#x60; to reassign ownership. Permitted   for the current owner or any admin in the account. The new value must   be the ID of an admin in the same account. - **Content edits** (any other writable field): respect the existing   &#x60;editable_by&#x60; rule; if &#x60;editable_by&#x60; is &#x60;owner_only&#x60;, only the   current owner may edit. 

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { UpdateCardTemplateRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Card template ID
    id: 56,
    // CardTemplateInput
    cardTemplateInput: ...,
  } satisfies UpdateCardTemplateRequest;

  try {
    const data = await api.updateCardTemplate(body);
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
| **id** | `number` | Card template ID | [Defaults to `undefined`] |
| **cardTemplateInput** | [CardTemplateInput](CardTemplateInput.md) |  | |

### Return type

[**CardTemplate**](CardTemplate.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Card template updated successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateCardTemplateBackgroundImage

> CardTemplate updateCardTemplateBackgroundImage(id, side, body)

Upload background image

Uploads or replaces the background image for the specified side.

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { UpdateCardTemplateBackgroundImageRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Card template ID
    id: 56,
    // 'front' | 'back' | Which side of the card
    side: side_example,
    // Blob
    body: BINARY_DATA_HERE,
  } satisfies UpdateCardTemplateBackgroundImageRequest;

  try {
    const data = await api.updateCardTemplateBackgroundImage(body);
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
| **id** | `number` | Card template ID | [Defaults to `undefined`] |
| **side** | `front`, `back` | Which side of the card | [Defaults to `undefined`] [Enum: front, back] |
| **body** | `Blob` |  | |

### Return type

[**CardTemplate**](CardTemplate.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `image/png`, `image/jpeg`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Background image uploaded successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## uploadCardTemplateFile

> LinkedFile uploadCardTemplateFile(id, fileUuid, fileRole, body)

Upload or replace linked file

Uploads or replaces a linked file for a card template. The file_role query parameter is required.

### Example

```ts
import {
  Configuration,
  CardTemplatesApi,
} from '@doorflow/api';
import type { UploadCardTemplateFileRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplatesApi(config);

  const body = {
    // number | Card template ID
    id: 56,
    // string | UUID of the linked file
    fileUuid: fileUuid_example,
    // string | Role of the file (e.g. background_front, background_back, logo)
    fileRole: fileRole_example,
    // Blob
    body: BINARY_DATA_HERE,
  } satisfies UploadCardTemplateFileRequest;

  try {
    const data = await api.uploadCardTemplateFile(body);
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
| **id** | `number` | Card template ID | [Defaults to `undefined`] |
| **fileUuid** | `string` | UUID of the linked file | [Defaults to `undefined`] |
| **fileRole** | `string` | Role of the file (e.g. background_front, background_back, logo) | [Defaults to `undefined`] |
| **body** | `Blob` |  | |

### Return type

[**LinkedFile**](LinkedFile.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/octet-stream`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File uploaded successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

