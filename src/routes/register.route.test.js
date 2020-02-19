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

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoserver.stop();
  });

  // beforeEach(async () => {
  //   const usersData = [
  //     {
  //       username: 'myUser',
  //       email: 'myuser@gmail.com',
  //       password: 'myuserabc123',
  //     },
  //   ];
  //   await User.create(usersData);
  // });

  afterEach(async () => {
    await User.deleteMany();
  });

  test('POST should return new user with no thoughts', async () => {
    const expectedUser = {
      username: 'myUserrr',
      email: 'myuserrr@gmail.com',
      password: 'myuserrrabc123',
    };
    const body = await request(app)
        .post('/register')
        .send({
          username: 'myUserrr',
          email: 'myuserrr@gmail.com',
          password: 'myuserrrabc123',
        })
        .expect(201);
    expect(body).toBe(expectedUser.username);
  });


  // describe('registering with invalid or missing inputs', () => {
  //   test('POST /register should return error text if fields are empty', async () => {

  //   });

  //   test('POST /register should notify user if a single field is invalid', async () => {

  //   });
  // });
});

