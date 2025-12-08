# @doorflow/api@3.0.0

A TypeScript SDK client for the api.doorflow.com API.

## Usage

First, install the SDK from npm.

```bash
npm install @doorflow/api --save
```

Next, try it out.


```ts
import {
  Configuration,
  AccountsApi,
} from '@doorflow/api';
import type { GetAccountRequest } from '@doorflow/api';

async function example() {
  console.log("🚀 Testing @doorflow/api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new AccountsApi(config);

  try {
    const data = await api.getAccount();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```


## Documentation

### API Endpoints

All URIs are relative to *https://api.doorflow.com*

| Class | Method | HTTP request | Description
| ----- | ------ | ------------ | -------------
*AccountsApi* | [**getAccount**](docs/AccountsApi.md#getaccount) | **GET** /api/3/account | Get current account details
*AdmissionRequestsApi* | [**getAdmissionRequest**](docs/AdmissionRequestsApi.md#getadmissionrequest) | **GET** /api/3/admission_requests/{id} | Get admission request status
*ChannelsApi* | [**admitChannel**](docs/ChannelsApi.md#admitchannel) | **POST** /api/3/channels/{id}/admit | Admit through channel (any person)
*ChannelsApi* | [**admitPerson**](docs/ChannelsApi.md#admitpersonoperation) | **POST** /api/3/channels/{id}/admit_person | Admit specific person through channel
*ChannelsApi* | [**autoUnlockChannel**](docs/ChannelsApi.md#autounlockchanneloperation) | **POST** /api/3/channels/{id}/auto_unlock | Set auto-unlock shift
*ChannelsApi* | [**getChannel**](docs/ChannelsApi.md#getchannel) | **GET** /api/3/channels/{id} | Get channel details
*ChannelsApi* | [**listChannels**](docs/ChannelsApi.md#listchannels) | **GET** /api/3/channels | List channels (door controllers)
*ChannelsApi* | [**lockdownChannel**](docs/ChannelsApi.md#lockdownchanneloperation) | **POST** /api/3/channels/{id}/lockdown | Enable lockdown mode
*ChannelsApi* | [**normalChannel**](docs/ChannelsApi.md#normalchannel) | **POST** /api/3/channels/{id}/normal | Return channel to normal mode
*ChannelsApi* | [**regenerateEncryptionKey**](docs/ChannelsApi.md#regenerateencryptionkey) | **POST** /api/3/channels/{id}/regenerate_encryption_key | Regenerate encryption key
*ChannelsApi* | [**removeEncryptionKey**](docs/ChannelsApi.md#removeencryptionkey) | **POST** /api/3/channels/{id}/remove_encryption_key | Remove encryption key
*ChannelsApi* | [**unlockChannel**](docs/ChannelsApi.md#unlockchanneloperation) | **POST** /api/3/channels/{id}/unlock | Unlock channel (unlock mode)
*ChannelsApi* | [**unlockdownChannel**](docs/ChannelsApi.md#unlockdownchannel) | **POST** /api/3/channels/{id}/unlockdown | Disable lockdown mode
*CredentialTypesApi* | [**listCredentialTypes**](docs/CredentialTypesApi.md#listcredentialtypes) | **GET** /api/3/credential_types | List credential types
*CredentialsApi* | [**createCredential**](docs/CredentialsApi.md#createcredential) | **POST** /api/3/people/{person_id}/credentials | Create credential
*CredentialsApi* | [**deleteCredential**](docs/CredentialsApi.md#deletecredential) | **DELETE** /api/3/people/{person_id}/credentials/{id} | Delete credential
*CredentialsApi* | [**getCredential**](docs/CredentialsApi.md#getcredential) | **GET** /api/3/people/{person_id}/credentials/{id} | Get credential details
*CredentialsApi* | [**listAllCredentials**](docs/CredentialsApi.md#listallcredentials) | **GET** /api/3/credentials | List all credentials
*CredentialsApi* | [**listPersonCredentials**](docs/CredentialsApi.md#listpersoncredentials) | **GET** /api/3/people/{person_id}/credentials | List person credentials
*CredentialsApi* | [**updateCredential**](docs/CredentialsApi.md#updatecredential) | **PUT** /api/3/people/{person_id}/credentials/{id} | Update credential
*EventsApi* | [**getEvent**](docs/EventsApi.md#getevent) | **GET** /api/3/events/{id} | Get event details
*EventsApi* | [**listEvents**](docs/EventsApi.md#listevents) | **GET** /api/3/events | List events
*GroupReservationsApi* | [**createGroupReservation**](docs/GroupReservationsApi.md#creategroupreservation) | **POST** /api/3/group_reservations | Create group reservation
*GroupReservationsApi* | [**deleteGroupReservation**](docs/GroupReservationsApi.md#deletegroupreservation) | **DELETE** /api/3/group_reservations/{id} | Delete group reservation
*GroupReservationsApi* | [**listGroupReservations**](docs/GroupReservationsApi.md#listgroupreservations) | **GET** /api/3/group_reservations | List group reservations
*GroupsApi* | [**listGroups**](docs/GroupsApi.md#listgroups) | **GET** /api/3/groups | List groups
*NotificationRulesApi* | [**createNotificationRule**](docs/NotificationRulesApi.md#createnotificationrule) | **POST** /api/3/notification_rules | Create notification rule
*NotificationRulesApi* | [**deleteNotificationRule**](docs/NotificationRulesApi.md#deletenotificationrule) | **DELETE** /api/3/notification_rules/{id} | Delete notification rule
*NotificationRulesApi* | [**getNotificationRule**](docs/NotificationRulesApi.md#getnotificationrule) | **GET** /api/3/notification_rules/{id} | Get notification rule details
*NotificationRulesApi* | [**listNotificationRules**](docs/NotificationRulesApi.md#listnotificationrules) | **GET** /api/3/notification_rules | List notification rules
*NotificationRulesApi* | [**updateNotificationRule**](docs/NotificationRulesApi.md#updatenotificationrule) | **PUT** /api/3/notification_rules/{id} | Update notification rule
*OauthApi* | [**authorizeOAuth**](docs/OauthApi.md#authorizeoauth) | **GET** /oauth/authorize | Authorization endpoint
*OauthApi* | [**getAccessToken**](docs/OauthApi.md#getaccesstoken) | **POST** /oauth/token | Obtain access token
*OauthApi* | [**getTokenInfo**](docs/OauthApi.md#gettokeninfo) | **GET** /oauth/token/info | Get token information
*OauthApi* | [**revokeToken**](docs/OauthApi.md#revoketoken) | **POST** /oauth/revoke | Revoke access token or refresh token
*PeopleApi* | [**createPerson**](docs/PeopleApi.md#createperson) | **POST** /api/3/people | Create person
*PeopleApi* | [**deletePerson**](docs/PeopleApi.md#deleteperson) | **DELETE** /api/3/people/{id} | Delete person
*PeopleApi* | [**getPerson**](docs/PeopleApi.md#getperson) | **GET** /api/3/people/{id} | Get person details
*PeopleApi* | [**listPeople**](docs/PeopleApi.md#listpeople) | **GET** /api/3/people | List people
*PeopleApi* | [**updatePerson**](docs/PeopleApi.md#updateperson) | **PUT** /api/3/people/{id} | Update person
*ReservationsApi* | [**createReservation**](docs/ReservationsApi.md#createreservation) | **POST** /api/3/reservations | Create reservation
*ReservationsApi* | [**deleteReservation**](docs/ReservationsApi.md#deletereservation) | **DELETE** /api/3/reservations/{id} | Delete reservation
*ReservationsApi* | [**listReservations**](docs/ReservationsApi.md#listreservations) | **GET** /api/3/reservations | List reservations
*RolesApi* | [**listRoles**](docs/RolesApi.md#listroles) | **GET** /api/3/roles | List roles
*SitesApi* | [**listSites**](docs/SitesApi.md#listsites) | **GET** /api/3/sites | List sites
*SyncApi* | [**initiateSync**](docs/SyncApi.md#initiatesync) | **POST** /api/3/sync | Initiate sync


### Models

- [Account](docs/Account.md)
- [AccountPassport](docs/AccountPassport.md)
- [AccountReseller](docs/AccountReseller.md)
- [AccountSync](docs/AccountSync.md)
- [AccountUser](docs/AccountUser.md)
- [AdmissionRequest](docs/AdmissionRequest.md)
- [AdmissionRequestDoorController](docs/AdmissionRequestDoorController.md)
- [AdmissionRequestPerson](docs/AdmissionRequestPerson.md)
- [AdmitChannel202Response](docs/AdmitChannel202Response.md)
- [AdmitPerson202Response](docs/AdmitPerson202Response.md)
- [AdmitPerson403Response](docs/AdmitPerson403Response.md)
- [AdmitPersonRequest](docs/AdmitPersonRequest.md)
- [AutoUnlockChannel400Response](docs/AutoUnlockChannel400Response.md)
- [AutoUnlockChannelRequest](docs/AutoUnlockChannelRequest.md)
- [Channel](docs/Channel.md)
- [ChannelAutoUnlock](docs/ChannelAutoUnlock.md)
- [ChannelLockdown](docs/ChannelLockdown.md)
- [ChannelLockdownAuxLockdown](docs/ChannelLockdownAuxLockdown.md)
- [ChannelLockdownCardLockdown](docs/ChannelLockdownCardLockdown.md)
- [ChannelLockdownRexLockdown](docs/ChannelLockdownRexLockdown.md)
- [ChannelMode](docs/ChannelMode.md)
- [ChannelSync](docs/ChannelSync.md)
- [CreateCredential422Response](docs/CreateCredential422Response.md)
- [CreateCredential422ResponseErrors](docs/CreateCredential422ResponseErrors.md)
- [Credential](docs/Credential.md)
- [CredentialInput](docs/CredentialInput.md)
- [CredentialInputPersonCredential](docs/CredentialInputPersonCredential.md)
- [CredentialType](docs/CredentialType.md)
- [CredentialUpdateInput](docs/CredentialUpdateInput.md)
- [CredentialUpdateInputPersonCredential](docs/CredentialUpdateInputPersonCredential.md)
- [DeleteGroupReservation200Response](docs/DeleteGroupReservation200Response.md)
- [Event](docs/Event.md)
- [GetAccessToken200Response](docs/GetAccessToken200Response.md)
- [GetAccessToken400Response](docs/GetAccessToken400Response.md)
- [GetAccessToken401Response](docs/GetAccessToken401Response.md)
- [GetAdmissionRequest401Response](docs/GetAdmissionRequest401Response.md)
- [GetAdmissionRequest403Response](docs/GetAdmissionRequest403Response.md)
- [GetAdmissionRequest404Response](docs/GetAdmissionRequest404Response.md)
- [GetAdmissionRequest500Response](docs/GetAdmissionRequest500Response.md)
- [GetTokenInfo200Response](docs/GetTokenInfo200Response.md)
- [GetTokenInfo200ResponseApplication](docs/GetTokenInfo200ResponseApplication.md)
- [GetTokenInfo401Response](docs/GetTokenInfo401Response.md)
- [Group](docs/Group.md)
- [GroupReservation](docs/GroupReservation.md)
- [GroupReservationInput](docs/GroupReservationInput.md)
- [GroupReservationInputGroupReservation](docs/GroupReservationInputGroupReservation.md)
- [InitiateSync429Response](docs/InitiateSync429Response.md)
- [ListEvents400Response](docs/ListEvents400Response.md)
- [LockdownChannelRequest](docs/LockdownChannelRequest.md)
- [ModelError](docs/ModelError.md)
- [NotificationRule](docs/NotificationRule.md)
- [NotificationRuleActionsInner](docs/NotificationRuleActionsInner.md)
- [NotificationRuleConditionsInner](docs/NotificationRuleConditionsInner.md)
- [NotificationRuleEventsInner](docs/NotificationRuleEventsInner.md)
- [NotificationRuleInput](docs/NotificationRuleInput.md)
- [Person](docs/Person.md)
- [PersonInput](docs/PersonInput.md)
- [Reservation](docs/Reservation.md)
- [ReservationInput](docs/ReservationInput.md)
- [RevokeToken403Response](docs/RevokeToken403Response.md)
- [Role](docs/Role.md)
- [Site](docs/Site.md)
- [SiteSiteIpsInner](docs/SiteSiteIpsInner.md)
- [UnlockChannelRequest](docs/UnlockChannelRequest.md)

### Authorization


Authentication schemes defined for the API:
<a id="OAuth2-accessCode"></a>
#### OAuth2 accessCode


- **Type**: OAuth
- **Flow**: accessCode
- **Authorization URL**: /oauth/authorize
- **Scopes**: N/A
<a id="basicAuth"></a>
#### basicAuth


- **Type**: HTTP basic authentication

## About

This TypeScript SDK client supports the [Fetch API](https://fetch.spec.whatwg.org/)
and is automatically generated by the
[OpenAPI Generator](https://openapi-generator.tech) project:

- API version: `3.0`
- Package version: `3.0.0`
- Generator version: `7.18.0-SNAPSHOT`
- Build package: `org.openapitools.codegen.languages.TypeScriptFetchClientCodegen`

The generated npm module supports the following:

- Environments
  * Node.js
  * Webpack
  * Browserify
- Language levels
  * ES5 - you must have a Promises/A+ library installed
  * ES6
- Module systems
  * CommonJS
  * ES6 module system

For more information, please visit [https://doorflow.com](https://doorflow.com)

## Development

### Building

To build the TypeScript source code, you need to have Node.js and npm installed.
After cloning the repository, navigate to the project directory and run:

```bash
npm install
npm run build
```

### Publishing

Once you've built the package, you can publish it to npm:

```bash
npm publish
```

## License

[]()
