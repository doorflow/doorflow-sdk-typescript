# CardTemplateTypesApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCardTemplateType**](CardTemplateTypesApi.md#createcardtemplatetype) | **POST** /api/3/card_template_types | Create card template type |
| [**deleteCardTemplateType**](CardTemplateTypesApi.md#deletecardtemplatetype) | **DELETE** /api/3/card_template_types/{code} | Delete card template type |
| [**getCardTemplateType**](CardTemplateTypesApi.md#getcardtemplatetype) | **GET** /api/3/card_template_types/{code} | Get card template type |
| [**listCardTemplateTypes**](CardTemplateTypesApi.md#listcardtemplatetypes) | **GET** /api/3/card_template_types | List card template types |
| [**updateCardTemplateType**](CardTemplateTypesApi.md#updatecardtemplatetype) | **PUT** /api/3/card_template_types/{code} | Update card template type |



## createCardTemplateType

> CardTemplateType createCardTemplateType(cardTemplateTypeInput)

Create card template type

Creates a new card template type. The code field must be unique.

### Example

```ts
import {
  Configuration,
  CardTemplateTypesApi,
} from '@doorflow/api';
import type { CreateCardTemplateTypeRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplateTypesApi(config);

  const body = {
    // CardTemplateTypeInput
    cardTemplateTypeInput: ...,
  } satisfies CreateCardTemplateTypeRequest;

  try {
    const data = await api.createCardTemplateType(body);
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
| **cardTemplateTypeInput** | [CardTemplateTypeInput](CardTemplateTypeInput.md) |  | |

### Return type

[**CardTemplateType**](CardTemplateType.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Card template type created successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCardTemplateType

> deleteCardTemplateType(code)

Delete card template type

Deletes a card template type. Fails with 409 Conflict if any card templates reference this type.

### Example

```ts
import {
  Configuration,
  CardTemplateTypesApi,
} from '@doorflow/api';
import type { DeleteCardTemplateTypeRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplateTypesApi(config);

  const body = {
    // string | Card template type code
    code: code_example,
  } satisfies DeleteCardTemplateTypeRequest;

  try {
    const data = await api.deleteCardTemplateType(body);
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
| **code** | `string` | Card template type code | [Defaults to `undefined`] |

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
| **204** | Card template type deleted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **409** | Card template type is in use by one or more card templates |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCardTemplateType

> CardTemplateType getCardTemplateType(code)

Get card template type

Returns a single card template type by its code.

### Example

```ts
import {
  Configuration,
  CardTemplateTypesApi,
} from '@doorflow/api';
import type { GetCardTemplateTypeRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplateTypesApi(config);

  const body = {
    // string | Card template type code
    code: code_example,
  } satisfies GetCardTemplateTypeRequest;

  try {
    const data = await api.getCardTemplateType(body);
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
| **code** | `string` | Card template type code | [Defaults to `undefined`] |

### Return type

[**CardTemplateType**](CardTemplateType.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Card template type retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCardTemplateTypes

> Array&lt;CardTemplateType&gt; listCardTemplateTypes(updatedSince)

List card template types

Returns all available card template types. This endpoint is not paginated.

### Example

```ts
import {
  Configuration,
  CardTemplateTypesApi,
} from '@doorflow/api';
import type { ListCardTemplateTypesRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplateTypesApi(config);

  const body = {
    // Date | ISO 8601 timestamp. Returns only types updated after this time (optional)
    updatedSince: 2013-10-20T19:20:30+01:00,
  } satisfies ListCardTemplateTypesRequest;

  try {
    const data = await api.listCardTemplateTypes(body);
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
| **updatedSince** | `Date` | ISO 8601 timestamp. Returns only types updated after this time | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;CardTemplateType&gt;**](CardTemplateType.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of card template types retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateCardTemplateType

> CardTemplateType updateCardTemplateType(code, cardTemplateTypeInput)

Update card template type

Updates an existing card template type. Submitting non_printable_zones replaces the entire zones array.

### Example

```ts
import {
  Configuration,
  CardTemplateTypesApi,
} from '@doorflow/api';
import type { UpdateCardTemplateTypeRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardTemplateTypesApi(config);

  const body = {
    // string | Card template type code
    code: code_example,
    // CardTemplateTypeInput
    cardTemplateTypeInput: ...,
  } satisfies UpdateCardTemplateTypeRequest;

  try {
    const data = await api.updateCardTemplateType(body);
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
| **code** | `string` | Card template type code | [Defaults to `undefined`] |
| **cardTemplateTypeInput** | [CardTemplateTypeInput](CardTemplateTypeInput.md) |  | |

### Return type

[**CardTemplateType**](CardTemplateType.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Card template type updated successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

