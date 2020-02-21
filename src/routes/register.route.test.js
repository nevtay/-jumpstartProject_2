/*eslint-disable-next-line*/
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
require('../utils/db');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// const jwt = require('jsonwebtoken');
// jest.mock('jsonwebtoken');

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

  beforeEach(async () => {
    const usersData = [
      {
        username: 'myUser',
        email: 'myuser@gmail.com',
        password: 'myuserabc123'
      }
    ];
    await User.create(usersData);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('POST creates user with empty thoughtsArray and hashes their password', async () => {
    const expectedUser = {
      username: 'notmyUser',
      email: 'notmyuser@gmail.com',
      password: 'myuserabc123'
    };
    const { body: user } = await request(app)
      .post('/register')
      .send(expectedUser)
      .expect(201);
    expect(user.username).toBe(expectedUser.username);
    expect(user.password).not.toBe(expectedUser.password);
    expect(user.thoughtsArray).toStrictEqual([]);
    expect(user.joinedOn).toContain(new Date().getFullYear());
  });

  describe('registering with invalid or missing inputs', () => {
    test('empty inputs should return an error', async () => {
      const expectedUser = {
        username: '',
        email: '',
        password: ''
      };
      const body = await request(app)
        .post('/register')
        .send(expectedUser)
        .expect(400);
      expect(body.text).toEqual('"username" is not allowed to be empty');
    });

    test('an invalid email address should return an error', async () => {
      const expectedUser = {
        username: 'abcrasd',
        email: 'notemail.com',
        password: 'iamahaiku'
      };
      const body = await request(app)
        .post('/register')
        .send(expectedUser)
        .expect(400);
      expect(body.text).toEqual('"email" must be a valid email');
    });

    test('a username of less than 3 characters should return an error', async () => {
      const expectedUser = {
        username: 'hi',
        email: 'notemail@gmail.com',
        password: 'iamahaiku'
      };
      const body = await request(app)
        .post('/register')
        .send(expectedUser)
        .expect(400);
      expect(body.text).toEqual(
        '"username" length must be at least 3 characters long'
      );
    });
  });
});
