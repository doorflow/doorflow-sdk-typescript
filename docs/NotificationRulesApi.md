# NotificationRulesApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createNotificationRule**](NotificationRulesApi.md#createnotificationrule) | **POST** /api/3/notification_rules | Create notification rule |
| [**deleteNotificationRule**](NotificationRulesApi.md#deletenotificationrule) | **DELETE** /api/3/notification_rules/{id} | Delete notification rule |
| [**getNotificationRule**](NotificationRulesApi.md#getnotificationrule) | **GET** /api/3/notification_rules/{id} | Get notification rule details |
| [**listNotificationRules**](NotificationRulesApi.md#listnotificationrules) | **GET** /api/3/notification_rules | List notification rules |
| [**updateNotificationRule**](NotificationRulesApi.md#updatenotificationrule) | **PUT** /api/3/notification_rules/{id} | Update notification rule |



## createNotificationRule

> NotificationRule createNotificationRule(notificationRuleInput)

Create notification rule

Creates a new notification rule to trigger webhooks or other actions when specific events occur. At least one action and one event must be specified. 

### Example

```ts
import {
  Configuration,
  NotificationRulesApi,
} from '@doorflow/api';
import type { CreateNotificationRuleRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new NotificationRulesApi(config);

  const body = {
    // NotificationRuleInput
    notificationRuleInput: ...,
  } satisfies CreateNotificationRuleRequest;

  try {
    const data = await api.createNotificationRule(body);
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
| **notificationRuleInput** | [NotificationRuleInput](NotificationRuleInput.md) |  | |

### Return type

[**NotificationRule**](NotificationRule.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Notification rule created successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteNotificationRule

> DeleteGroupReservation200Response deleteNotificationRule(id)

Delete notification rule

Deletes a notification rule

### Example

```ts
import {
  Configuration,
  NotificationRulesApi,
} from '@doorflow/api';
import type { DeleteNotificationRuleRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new NotificationRulesApi(config);

  const body = {
    // number | Notification rule ID
    id: 56,
  } satisfies DeleteNotificationRuleRequest;

  try {
    const data = await api.deleteNotificationRule(body);
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
| **id** | `number` | Notification rule ID | [Defaults to `undefined`] |

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
| **200** | Notification rule deleted successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getNotificationRule

> NotificationRule getNotificationRule(id)

Get notification rule details

Returns details for a specific notification rule

### Example

```ts
import {
  Configuration,
  NotificationRulesApi,
} from '@doorflow/api';
import type { GetNotificationRuleRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new NotificationRulesApi(config);

  const body = {
    // number | Notification rule ID
    id: 56,
  } satisfies GetNotificationRuleRequest;

  try {
    const data = await api.getNotificationRule(body);
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
| **id** | `number` | Notification rule ID | [Defaults to `undefined`] |

### Return type

[**NotificationRule**](NotificationRule.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Notification rule details retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listNotificationRules

> Array&lt;NotificationRule&gt; listNotificationRules()

List notification rules

Returns a list of all notification rules for the authenticated user. Notification rules define webhooks or other actions that are triggered when specific events occur. This endpoint does not support pagination. 

### Example

```ts
import {
  Configuration,
  NotificationRulesApi,
} from '@doorflow/api';
import type { ListNotificationRulesRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new NotificationRulesApi(config);

  try {
    const data = await api.listNotificationRules();
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

[**Array&lt;NotificationRule&gt;**](NotificationRule.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of notification rules retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateNotificationRule

> NotificationRule updateNotificationRule(id, notificationRuleInput)

Update notification rule

Updates an existing notification rule. This replaces all conditions, events, and actions with the new values provided in the request. 

### Example

```ts
import {
  Configuration,
  NotificationRulesApi,
} from '@doorflow/api';
import type { UpdateNotificationRuleRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new NotificationRulesApi(config);

  const body = {
    // number | Notification rule ID
    id: 56,
    // NotificationRuleInput
    notificationRuleInput: ...,
  } satisfies UpdateNotificationRuleRequest;

  try {
    const data = await api.updateNotificationRule(body);
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
| **id** | `number` | Notification rule ID | [Defaults to `undefined`] |
| **notificationRuleInput** | [NotificationRuleInput](NotificationRuleInput.md) |  | |

### Return type

[**NotificationRule**](NotificationRule.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Notification rule updated successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **422** | Unprocessable Entity - Validation failed |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

