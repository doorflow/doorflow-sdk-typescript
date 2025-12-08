# OauthApi

All URIs are relative to *https://api.doorflow.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authorizeOAuth**](OauthApi.md#authorizeoauth) | **GET** /oauth/authorize | Authorization endpoint |
| [**getAccessToken**](OauthApi.md#getaccesstoken) | **POST** /oauth/token | Obtain access token |
| [**getTokenInfo**](OauthApi.md#gettokeninfo) | **GET** /oauth/token/info | Get token information |
| [**revokeToken**](OauthApi.md#revoketoken) | **POST** /oauth/revoke | Revoke access token or refresh token |



## authorizeOAuth

> authorizeOAuth(responseType, clientId, redirectUri, scope, state, codeChallenge, codeChallengeMethod)

Authorization endpoint

Initiates the OAuth 2.0 authorization code flow. Direct users to this endpoint to request authorization.  **Authorization Code Flow Steps:** 1. Direct the user\&#39;s browser to this endpoint with required parameters 2. User logs in (if not already authenticated) and authorizes your application 3. User is redirected to your &#x60;redirect_uri&#x60; with an authorization &#x60;code&#x60; parameter 4. Exchange the code for an access token at &#x60;/oauth/token&#x60;  **PKCE (Proof Key for Code Exchange):** For public clients (mobile/SPA applications), PKCE is recommended for security: 1. Generate a random &#x60;code_verifier&#x60; (43-128 characters) 2. Create &#x60;code_challenge&#x60; &#x3D; BASE64URL(SHA256(code_verifier)) 3. Include &#x60;code_challenge&#x60; and &#x60;code_challenge_method&#x3D;S256&#x60; in this request 4. Include &#x60;code_verifier&#x60; when exchanging the code at &#x60;/oauth/token&#x60;  **Important Notes:** - This is a browser-based flow - users will see a login/authorization screen - The &#x60;redirect_uri&#x60; must be pre-registered with your OAuth application - The authorization code expires after 10 minutes - Some applications may be configured to skip the authorization screen (auto-approve) 

### Example

```ts
import {
  Configuration,
  OauthApi,
} from '@doorflow/api';
import type { AuthorizeOAuthRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const api = new OauthApi();

  const body = {
    // 'code' | OAuth response type (must be \"code\" for authorization code flow)
    responseType: code,
    // string | Your OAuth application\'s client ID
    clientId: abc123xyz,
    // string | URI to redirect to after authorization (must match registered redirect URI)
    redirectUri: https://example.com/callback,
    // string | Space-separated list of requested scopes (see available scopes in security schemes section)
    scope: account.person.readonly account.channel.readonly,
    // string | Opaque value to maintain state between request and callback (recommended for CSRF protection) (optional)
    state: random_state_string_123,
    // string | PKCE code challenge (BASE64URL(SHA256(code_verifier))) (optional)
    codeChallenge: E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM,
    // 'S256' | PKCE code challenge method (must be S256) (optional)
    codeChallengeMethod: S256,
  } satisfies AuthorizeOAuthRequest;

  try {
    const data = await api.authorizeOAuth(body);
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
| **responseType** | `code` | OAuth response type (must be \&quot;code\&quot; for authorization code flow) | [Defaults to `undefined`] [Enum: code] |
| **clientId** | `string` | Your OAuth application\&#39;s client ID | [Defaults to `undefined`] |
| **redirectUri** | `string` | URI to redirect to after authorization (must match registered redirect URI) | [Defaults to `undefined`] |
| **scope** | `string` | Space-separated list of requested scopes (see available scopes in security schemes section) | [Defaults to `undefined`] |
| **state** | `string` | Opaque value to maintain state between request and callback (recommended for CSRF protection) | [Optional] [Defaults to `undefined`] |
| **codeChallenge** | `string` | PKCE code challenge (BASE64URL(SHA256(code_verifier))) | [Optional] [Defaults to `undefined`] |
| **codeChallengeMethod** | `S256` | PKCE code challenge method (must be S256) | [Optional] [Defaults to `undefined`] [Enum: S256] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/html`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **302** | Redirects to redirect_uri with authorization code or error.  **Success redirect:** &#x60;https://example.com/callback?code&#x3D;AUTH_CODE&amp;state&#x3D;STATE&#x60;  **Error redirect:** &#x60;https://example.com/callback?error&#x3D;access_denied&amp;error_description&#x3D;DESCRIPTION&amp;state&#x3D;STATE&#x60;  |  -  |
| **400** | Bad Request - Invalid parameters |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAccessToken

> GetAccessToken200Response getAccessToken(grantType, clientId, clientSecret, code, redirectUri, codeVerifier, refreshToken, scope)

Obtain access token

Exchange authorization code for an access token, or refresh an existing token.  **Authorization Code Flow:** 1. Direct users to &#x60;/oauth/authorize&#x60; with your client_id, redirect_uri, and requested scopes 2. User authorizes your application 3. You receive an authorization code at your redirect_uri 4. Exchange the code for an access token using this endpoint with &#x60;grant_type&#x3D;authorization_code&#x60;  **Refreshing Tokens:** - Use &#x60;grant_type&#x3D;refresh_token&#x60; with a valid refresh_token to obtain a new access token - Access tokens expire after 1 hour - Refresh tokens are long-lived and should be stored securely 

### Example

```ts
import {
  Configuration,
  OauthApi,
} from '@doorflow/api';
import type { GetAccessTokenRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const api = new OauthApi();

  const body = {
    // string | OAuth grant type (use \\\"authorization_code\\\" to exchange an authorization code, or \\\"refresh_token\\\" to refresh an access token)
    grantType: grantType_example,
    // string | OAuth client ID (required for all grant types) (optional)
    clientId: clientId_example,
    // string | OAuth client secret (required for confidential clients) (optional)
    clientSecret: clientSecret_example,
    // string | Authorization code (required when grant_type=authorization_code) (optional)
    code: code_example,
    // string | Redirect URI (required when grant_type=authorization_code, must match the one used in authorization request) (optional)
    redirectUri: redirectUri_example,
    // string | PKCE code verifier (required if PKCE was used in authorization request) (optional)
    codeVerifier: codeVerifier_example,
    // string | Refresh token (required when grant_type=refresh_token) (optional)
    refreshToken: refreshToken_example,
    // string | Space-separated list of requested scopes (optional, defaults to application\\\'s configured scopes) (optional)
    scope: scope_example,
  } satisfies GetAccessTokenRequest;

  try {
    const data = await api.getAccessToken(body);
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
| **grantType** | `authorization_code`, `refresh_token` | OAuth grant type (use \\\&quot;authorization_code\\\&quot; to exchange an authorization code, or \\\&quot;refresh_token\\\&quot; to refresh an access token) | [Defaults to `undefined`] [Enum: authorization_code, refresh_token] |
| **clientId** | `string` | OAuth client ID (required for all grant types) | [Optional] [Defaults to `undefined`] |
| **clientSecret** | `string` | OAuth client secret (required for confidential clients) | [Optional] [Defaults to `undefined`] |
| **code** | `string` | Authorization code (required when grant_type&#x3D;authorization_code) | [Optional] [Defaults to `undefined`] |
| **redirectUri** | `string` | Redirect URI (required when grant_type&#x3D;authorization_code, must match the one used in authorization request) | [Optional] [Defaults to `undefined`] |
| **codeVerifier** | `string` | PKCE code verifier (required if PKCE was used in authorization request) | [Optional] [Defaults to `undefined`] |
| **refreshToken** | `string` | Refresh token (required when grant_type&#x3D;refresh_token) | [Optional] [Defaults to `undefined`] |
| **scope** | `string` | Space-separated list of requested scopes (optional, defaults to application\\\&#39;s configured scopes) | [Optional] [Defaults to `undefined`] |

### Return type

[**GetAccessToken200Response**](GetAccessToken200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/x-www-form-urlencoded`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Access token issued successfully |  -  |
| **400** | Bad Request - Invalid grant, missing parameters, or invalid credentials |  -  |
| **401** | Unauthorized - Invalid client credentials |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getTokenInfo

> GetTokenInfo200Response getTokenInfo()

Get token information

Returns information about the current access token being used for authentication.  This endpoint provides metadata about the access token including the resource owner, account, scopes, and expiration.  **Authentication:** Requires a valid OAuth2 access token in the Authorization header. 

### Example

```ts
import {
  Configuration,
  OauthApi,
} from '@doorflow/api';
import type { GetTokenInfoRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OauthApi(config);

  try {
    const data = await api.getTokenInfo();
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

[**GetTokenInfo200Response**](GetTokenInfo200Response.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Token information retrieved successfully |  -  |
| **401** | Unauthorized - Invalid or missing access token |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## revokeToken

> object revokeToken(authorization, token, tokenTypeHint)

Revoke access token or refresh token

Revokes an access token or refresh token, immediately invalidating it and blocking associated tokens from making further requests.  **When to revoke:** - User disconnects their DoorFlow account from your integration - User logs out - Security breach - revoke compromised tokens - Application uninstall  **Important:** - **We recommend revoking the refresh_token** - this will invalidate all associated access tokens - Returns HTTP 200 even if the token was already invalid (prevents token scanning attacks) - Client authentication is required via HTTP Basic Auth header  **Authentication:** You must authenticate using HTTP Basic Authentication with your client credentials: 1. Combine your client_id and client_secret as: &#x60;{client_id}:{client_secret}&#x60; 2. Encode using URL-safe Base64 3. Include in Authorization header: &#x60;Authorization: Basic {encoded_credentials}&#x60; 

### Example

```ts
import {
  Configuration,
  OauthApi,
} from '@doorflow/api';
import type { RevokeTokenRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure HTTP basic authorization: basicAuth
    username: "YOUR USERNAME",
    password: "YOUR PASSWORD",
  });
  const api = new OauthApi(config);

  const body = {
    // string | HTTP Basic Authentication using client_id:client_secret encoded with URL-safe Base64
    authorization: Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ=,
    // string | The access token or refresh token to revoke (we recommend using refresh_token)
    token: token_example,
    // string | Optional hint about the type of token being revoked. We recommend using \\\'refresh_token\\\' for all revocations as it invalidates all associated tokens. Invalid token type hint values are ignored and do not affect the revocation response.  (optional)
    tokenTypeHint: tokenTypeHint_example,
  } satisfies RevokeTokenRequest;

  try {
    const data = await api.revokeToken(body);
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
| **authorization** | `string` | HTTP Basic Authentication using client_id:client_secret encoded with URL-safe Base64 | [Defaults to `undefined`] |
| **token** | `string` | The access token or refresh token to revoke (we recommend using refresh_token) | [Defaults to `undefined`] |
| **tokenTypeHint** | `access_token`, `refresh_token` | Optional hint about the type of token being revoked. We recommend using \\\&#39;refresh_token\\\&#39; for all revocations as it invalidates all associated tokens. Invalid token type hint values are ignored and do not affect the revocation response.  | [Optional] [Defaults to `undefined`] [Enum: access_token, refresh_token] |

### Return type

**object**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: `application/x-www-form-urlencoded`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Token revocation successful or token was already invalid.  Returns HTTP 200 even for invalid tokens because: - The client cannot handle such errors in a reasonable way - The purpose of invalidating the token is already achieved - Prevents information leakage about token validity  Empty JSON response body.  |  -  |
| **403** | Forbidden - Client credentials not submitted correctly or you are not authorized to revoke this token.  Common causes: - Not using HTTP Basic Authentication scheme - Credentials not encoded with URL-safe Base64 - Attempting to revoke a token that belongs to another client  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

