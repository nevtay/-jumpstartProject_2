## TO show
[x] ABOUT: Twitter clone called Thoughtter
    [x] Create a profile
    [x] Post a thought
    [x] ????
    [x] profit!!!!

[x] https://desolate-ocean-50585.herokuapp.com/users
    [x] Starting point: Display Project Routes

[x] https://desolate-ocean-50585.herokuapp.com/users
    [x] If logged in, show login page 
    [x] If NOT logged in, ask viewer to login

[x] https://desolate-ocean-50585.herokuapp.com/users/:username
    [x] Retrieve profile that matches :username if user exists
    [x] Otherwise, return "Uh oh - user ":username" doesn't exist!"

[x] https://desolate-ocean-50585.herokuapp.com/register
    [x] Create a new user if username, email, and password are valid
    [x] Registration 



what does your app do?
- the problem statement

describe architecture
- front-end/back-end separation
  - front-end (SPA: Single Page App)
  - server-side rendering

tech stack
- MERN? MEAN? 
- e.g. FE: React, BE: ExpressJS, RESTful API, DB: MongoDB(noSQL) with mongoose(ODM: object document model)

nature of architecture
- what are the typical behaviours of your stack?
- scaling? multiple-servers hitting the same database? backup options?

nature of app
- unit tests: Jest, Supertest, in-memory db (e.g. mongo-memory-server)
 - use in-memory db so other users don't have to set up the db
  - it's also fast because everything is run inside RAM
 - use supertest because we don't want to call the actual server
 - noSQL has no fixed schema, which makes it flexible
 - consider READ/WRITE speed r/s
  - 1 : 1, 1 : many, many : many
- linting: eslint with prettier
- language: JS
 - not strongly typed
 - no need for type declaration
 - widely used by all browsers
 - fast development time
 - BUT error prone and no stringent structure (hard to consistently enforce best practices)

workflow
- step-by-step process: imagine a "choose your own adventure" style guide
 - i.e. if i do this, what can i do next / where can i go from here?

modelling
 - schema