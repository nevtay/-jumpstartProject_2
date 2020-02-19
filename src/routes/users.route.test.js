const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const User = require('../models/User');
// require('../utils/db');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


describe('registering new user', () => {
  // setup mongodb connection before each test
  let mongoserver;
  beforeAll(async () => {
    try {
      mongoserver = new MongoMemoryServer();
      const mongoUri = await mongoserver.getConnectionString();
      await mongoose.connect(mongoUri);
    } catch (err) {
      console.log(err);
    }
  });

  // disconnect from server after all tests have run
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoserver.stop();
  });

  // create mock data for each test
  beforeEach(async () => {
    const testUserProfile = [{
      username: 'usernameee',
      email: 'email@email.com',
      password: 'password',
      thoughtsArray: [],
    }];
    await User.create(testUserProfile);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  test('GET /users should return a string', async () => {
    const body = await request(app)
        .get('/users')
        .expect(200);
    expect(body.text).toBe('Path to /user is working');
  });

  test('GET /users/:username returns user without password if user exists', async () => {
    const {body: actualUser} = await request(app)
        .get('/users/usernameee')
        .expect(200);
    expect(actualUser).toHaveProperty('username', 'usernameee');
    expect(actualUser).toHaveProperty('email', 'email@email.com');
    expect(actualUser).toHaveProperty('thoughtsArray', []);
    expect(actualUser).not.toHaveProperty('password');
  });

  test('GET /users/:username returns error message if user doesn\'t exist', async () => {
    const body = await request(app)
        .get('/users/thisUserDoesNotExist');
    expect(body.statusCode).toBe(404);
    expect(body.text).toEqual('Uh oh - user "thisUserDoesNotExist" doesn\'t exist!');
  });
});
