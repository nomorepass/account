## account
[![Build Status](https://travis-ci.org/nomorepass/account.svg?branch=master)](https://travis-ci.org/nomorepass/account)
[![Coverage Status](https://coveralls.io/repos/github/nomorepass/account/badge.svg?branch=master)](https://coveralls.io/github/nomorepass/account?branch=master)

APIs for user management.

## APIs
### SIGNUP
`POST /users/signup`
#### Parameters
| Name | Type | Description |
| ------| ------ | ------ |
| username | string | **Required**. your username. 6-16 length, unique in db. |
| email | string | **Required**. your email. unique in db. |
| password | string | **Required**. your password. |
#### Example
```
{
  "username": "isayme",
  "email": "test@test.com",
  "password": "123456"
}
```

### LOGIN
`POST /users/login`
#### Parameters
| Name | Type | Description |
| ------| ------ | ------ |
| username | string | your username. any of username/email will be find. |
| email | string | your email. any of username/email will be find. |
| password | string | **Required**. your password. |
#### Example
```
{
  "email": "test@test.com",
  "password": "123456"
}
```

### LOGOUT
`POST /users/logout`

### ME (get my profile)
`GET /users/me`

## Authorization
If login success, API will set header `Authorization` in response, the value will be the token for authenticated requests.

`curl -H 'Authorization: Bearer xxxx`
