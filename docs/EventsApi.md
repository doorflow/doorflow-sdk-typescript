# EventsApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getEvent**](EventsApi.md#getevent) | **GET** /api/3/events/{id} | Get event details |
| [**listEvents**](EventsApi.md#listevents) | **GET** /api/3/events | List events |



## getEvent

> Event getEvent(id, callback, ackToken)

Get event details

Returns details for a specific event by ID. Supports webhook acknowledgment via callback/ack_token parameters.

### Example

```ts
import {
  Configuration,
  EventsApi,
} from '@doorflow/api';
import type { GetEventRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EventsApi(config);

  const body = {
    // number | Event ID
    id: 56,
    // string | Webhook callback ID for acknowledgment (optional)
    callback: callback_example,
    // string | Webhook acknowledgment token (optional)
    ackToken: ackToken_example,
  } satisfies GetEventRequest;

  try {
    const data = await api.getEvent(body);
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
| **id** | `number` | Event ID | [Defaults to `undefined`] |
| **callback** | `string` | Webhook callback ID for acknowledgment | [Optional] [Defaults to `undefined`] |
| **ackToken** | `string` | Webhook acknowledgment token | [Optional] [Defaults to `undefined`] |

### Return type

[**Event**](Event.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Event details retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **404** | Not Found - Resource does not exist or is not an admission request event |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listEvents

> Array&lt;Event&gt; listEvents(eventCodes, firstName, lastName, channels, doorControllers, since, level, sort, n, page)

List events

Returns a paginated list of events (access control activity logs) for the authenticated user\&#39;s account. By default, returns person access events (admits and rejects) from the last 90 days. Use &#x60;event_codes&#x60; parameter to filter by specific event types, or &#x60;level&#x3D;debug&#x60; to include channel status events. 

### Example

```ts
import {
  Configuration,
  EventsApi,
} from '@doorflow/api';
import type { ListEventsRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EventsApi(config);

  const body = {
    // Array<number> | Comma-separated list of event codes to filter by. If not specified, defaults to person access events (admits and rejects). Allowed event codes include: admit codes (10-18, 70), reject codes (20-29, 71-73), channel status codes (1-3), auto-unlock codes (40-42), tamper codes (90-91), door alarm codes (31-37), REX codes (30), sync codes (100-107), LDAP sync codes (220, 223-225).  (optional)
    eventCodes: 10,11,20,21,
    // string | Filter by person\'s first name (optional)
    firstName: firstName_example,
    // string | Filter by person\'s last name (optional)
    lastName: lastName_example,
    // Array<number> | Filter by channel IDs (comma-separated) (optional)
    channels: ...,
    // Array<number> | Filter by door controller IDs (alias for channels parameter) (optional)
    doorControllers: ...,
    // Date | Return events created since this timestamp. Defaults to 90 days ago if not specified. (optional)
    since: 2013-10-20T19:20:30+01:00,
    // 'debug' | Set to \"debug\" to include channel status events in addition to access events (optional)
    level: level_example,
    // 'ASC' | 'DESC' | Sort order for results (optional)
    sort: sort_example,
    // number | Number of results per page (max 1000) (optional)
    n: 56,
    // number | Page number for pagination (optional)
    page: 56,
  } satisfies ListEventsRequest;

  try {
    const data = await api.listEvents(body);
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
| **eventCodes** | `Array<number>` | Comma-separated list of event codes to filter by. If not specified, defaults to person access events (admits and rejects). Allowed event codes include: admit codes (10-18, 70), reject codes (20-29, 71-73), channel status codes (1-3), auto-unlock codes (40-42), tamper codes (90-91), door alarm codes (31-37), REX codes (30), sync codes (100-107), LDAP sync codes (220, 223-225).  | [Optional] |
| **firstName** | `string` | Filter by person\&#39;s first name | [Optional] [Defaults to `undefined`] |
| **lastName** | `string` | Filter by person\&#39;s last name | [Optional] [Defaults to `undefined`] |
| **channels** | `Array<number>` | Filter by channel IDs (comma-separated) | [Optional] |
| **doorControllers** | `Array<number>` | Filter by door controller IDs (alias for channels parameter) | [Optional] |
| **since** | `Date` | Return events created since this timestamp. Defaults to 90 days ago if not specified. | [Optional] [Defaults to `undefined`] |
| **level** | `debug` | Set to \&quot;debug\&quot; to include channel status events in addition to access events | [Optional] [Defaults to `undefined`] [Enum: debug] |
| **sort** | `ASC`, `DESC` | Sort order for results | [Optional] [Defaults to `&#39;DESC&#39;`] [Enum: ASC, DESC] |
| **n** | `number` | Number of results per page (max 1000) | [Optional] [Defaults to `50`] |
| **page** | `number` | Page number for pagination | [Optional] [Defaults to `1`] |

### Return type

[**Array&lt;Event&gt;**](Event.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of events retrieved successfully |  * Total - Total number of records <br>  * Per-Page - Number of records per page <br>  |
| **400** | Bad Request - Invalid event codes specified |  -  |
| **401** | Unauthorized - Invalid or missing authentication |  -  |
| **403** | Forbidden - User does not have permission |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

