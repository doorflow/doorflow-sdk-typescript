# CardDesignsApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCardDesign**](CardDesignsApi.md#createcarddesign) | **POST** /api/3/card_designs | Create card design |
| [**deleteCardDesign**](CardDesignsApi.md#deletecarddesign) | **DELETE** /api/3/card_designs/{id} | Delete card design |
| [**getCardDesign**](CardDesignsApi.md#getcarddesign) | **GET** /api/3/card_designs/{id} | Get card design |
| [**listCardDesigns**](CardDesignsApi.md#listcarddesigns) | **GET** /api/3/card_designs | List card designs |
| [**updateCardDesign**](CardDesignsApi.md#updatecarddesign) | **PUT** /api/3/card_designs/{id} | Update card design |



## createCardDesign

> CardDesign createCardDesign(cardDesignInput)

Create card design

Creates a new card design. Images can be provided as base64-encoded strings.

### Example

```ts
import {
  Configuration,
  CardDesignsApi,
} from '@doorflow/api';
import type { CreateCardDesignRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardDesignsApi(config);

  const body = {
    // CardDesignInput
    cardDesignInput: ...,
  } satisfies CreateCardDesignRequest;

  try {
    const data = await api.createCardDesign(body);
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
| **cardDesignInput** | [CardDesignInput](CardDesignInput.md) |  | |

### Return type

[**CardDesign**](CardDesign.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Card design created successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCardDesign

> DeleteCardDesign200Response deleteCardDesign(id)

Delete card design

Permanently deletes a card design and its associated images.

### Example

```ts
import {
  Configuration,
  CardDesignsApi,
} from '@doorflow/api';
import type { DeleteCardDesignRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardDesignsApi(config);

  const body = {
    // number | Card Design ID
    id: 56,
  } satisfies DeleteCardDesignRequest;

  try {
    const data = await api.deleteCardDesign(body);
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
| **id** | `number` | Card Design ID | [Defaults to `undefined`] |

### Return type

[**DeleteCardDesign200Response**](DeleteCardDesign200Response.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Card design deleted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCardDesign

> CardDesign getCardDesign(id)

Get card design

Returns details for a specific card design including image URLs at multiple sizes.

### Example

```ts
import {
  Configuration,
  CardDesignsApi,
} from '@doorflow/api';
import type { GetCardDesignRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardDesignsApi(config);

  const body = {
    // number | Card Design ID
    id: 56,
  } satisfies GetCardDesignRequest;

  try {
    const data = await api.getCardDesign(body);
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
| **id** | `number` | Card Design ID | [Defaults to `undefined`] |

### Return type

[**CardDesign**](CardDesign.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Card design retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCardDesigns

> Array&lt;CardDesign&gt; listCardDesigns()

List card designs

Returns all card designs for the authenticated user\&#39;s account.

### Example

```ts
import {
  Configuration,
  CardDesignsApi,
} from '@doorflow/api';
import type { ListCardDesignsRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardDesignsApi(config);

  try {
    const data = await api.listCardDesigns();
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

[**Array&lt;CardDesign&gt;**](CardDesign.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of card designs retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateCardDesign

> CardDesign updateCardDesign(id, cardDesignInput)

Update card design

Updates an existing card design. Images can be replaced by providing new base64-encoded strings.

### Example

```ts
import {
  Configuration,
  CardDesignsApi,
} from '@doorflow/api';
import type { UpdateCardDesignRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CardDesignsApi(config);

  const body = {
    // number | Card Design ID
    id: 56,
    // CardDesignInput
    cardDesignInput: ...,
  } satisfies UpdateCardDesignRequest;

  try {
    const data = await api.updateCardDesign(body);
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
| **id** | `number` | Card Design ID | [Defaults to `undefined`] |
| **cardDesignInput** | [CardDesignInput](CardDesignInput.md) |  | |

### Return type

[**CardDesign**](CardDesign.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Card design updated successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

