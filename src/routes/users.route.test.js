const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const User = require('../models/User');
require('../utils/db');

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
      username: 'username',
      email: 'email@email.com',
      password: 'password',
    }];
    await User.create(testUserProfile);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  test('POST /register should return a new user with an empty thoughtsArray', async () => {
    const expectedUser = {
      username: 'username',
      email: 'email@email.com',
      password: 'password',
      thoughtsArray: [],
    };
    const {body: actualUser} = await request(app)
        .post('/users/register')
        .send(expectedUser)
        .expect(201);
    expect(actualUser).toMatchObject(expectedUser, '-_id, -__v');
  });

  test('POST /register should return details of new user', async () => {
    const expectedUser = {
      username: 'username',
      email: 'email@email.com',
      password: 'password',
      thoughtsArray: [],
    };
    const {body: actualUser} = await request(app)
        .post('/users/register')
        .send(expectedUser)
        .expect(201);
    expect(actualUser).toMatchObject(expectedUser, '-_id, -__v');
  });
})
;
