# TODOS

## Setup
* [x] Install dependencies
    * to install: cor, and cookies
* [x] Install + Setup Linter
* [x] Setup Express
* [x] Setup MongoDB Connection
* [x] Setup Not Found & Error Middlewares
    * [x] Create middlewares folder
* [x] Setup Schema for users and thoughts
* [x] Setup .gitignore and .env files

## Tests
* /App
    * [x] "GET /" Returns 200 and endpoints 
* /User.Route
    * [x] "GET /users" Returns "Access Forbidden!" 
    * [x] "GET /users/:username" returns 200 and user profile sans password 
    * [x] "GET /users/:username" returns 404 and error message if user doesn't exist
    * [x] Jest test login/logout on users.route
* /Register.Route
    * [x] "POST /register" returns new user with no thoughts if registration is successful 
    * [x] "POST /register" returns error if all fields are empty
    * [x] "POST /register/" returns 400 and field-specific error message if aforementioned field is empty

## Helpful
* [x] use joi validation for email
* [x] editable fields in user schema
    [x] email
    [x] description

## Today
* [x] POST and DELETE thoughts from thoughtArrays
* [x] PATCH and DELETE users