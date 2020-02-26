const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtKeySecret} = require('../config/retrieveJWTSecret');
const cookieParser = require('cookie-parser');

jest.mock('jsonwebtoken');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

describe('/users', () => {
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
    const testUserProfile = [
      {
        username: 'bob123',
        email: 'email@email.com',
        password: 'password',
        thoughtsArray: [],
      },
    ];
    await User.create(testUserProfile);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  test('GET /users should return "Access Forbidden" when no user is logged in ', async () => {
    const body = await request(app)
        .get('/users')
        .expect(401);
    expect(body.text).toBe('Access forbidden!');
  });

  test('GET /users/:username returns user without password if user exists', async () => {
    const {body: actualUser} = await request(app)
        .get('/users/bob123')
        .expect(200);
    expect(actualUser).toHaveProperty('username', 'bob123');
    expect(actualUser).toHaveProperty('email', 'email@email.com');
    expect(actualUser).toHaveProperty('thoughtsArray', []);
    expect(actualUser).not.toHaveProperty('password');
  });

  test('GET /users/:username returns error message if user doesn\'t exist', async () => {
    const body = await request(app).get('/users/thisUserDoesNotExist');
    expect(body.statusCode).toBe(404);
    expect(body.text).toEqual(
        'Uh oh - user "thisUserDoesNotExist" doesn\'t exist!',
    );
  });

  describe('/users/login', () => {
    test('should request user to login if user is not logged in', async () => {
      const body = await request(app)
          .get('/users')
          .expect(401);
      expect(body.text).toBe('Access forbidden!');
    });

    test('login fails if user does not exist', async () => {
      const invalidUser = {
        username: 'alice321',
        password: 'password',
      };

      const response = await request(app)
          .post('/users/login')
          .send(invalidUser)
          .set('Cookie', 'token=valid-token');
      expect(response.text).toEqual('Invalid username');
    });

    test('login fails if password is invalid', async () => {
      const expectedUser = {
        username: 'bob123',
        password: 'pass',
      };

      const response = await request(app)
          .post('/users/login')
          .send(expectedUser)
          .set('Cookie', 'token=valid-token');
      expect(response.text).toEqual('Invalid password');
    });

    test('login succeeds only if username and password are valid', async () => {
      const expectedUser = {
        username: 'bob123',
        password: 'password',
      };

      const response = await request(app)
          .post('/users/login')
          .send(expectedUser)
          .set('Cookie', 'token=valid-token');
      expect(response.text).toEqual('Login success');
    });

    test('if logged in, visiting /users returns user profile', async () => {
      // mock being logged in
      const expectedUser = {
        username: 'bob123',
        email: 'email@email.com',
        password: 'password',
        thoughtsArray: [],
      };
      jwt.verify.mockReturnValueOnce({username: expectedUser.username});

      const response = await request(app)
          .get('/users')
          .set('Cookie', 'loginToken=valid-token');
      // console.log(response);
      expect(response.body.username).toEqual('bob123');
      expect(response.body.email).toEqual('email@email.com');
      expect(response.body.thoughtsArray).toStrictEqual([]);
    });

      test('posting thoughts fails if user isn\'t logged in', async () => {
        const testContent = {
          content: 'test content!',
        };

        const body = await request(app)
            .post('/users/posthought')
            .send(testContent);
        expect(body.text).toEqual('Access forbidden!');
      });

      test('posting thoughts only succeeds if user is logged in', async () => {
        const expectedUser = {
          username: 'bob123',
          email: 'email@email.com',
          password: 'password',
          thoughtsArray: [],
        };

        jwt.verify.mockReturnValueOnce({
          username: expectedUser.username,
        });

        const newThought = {
          content: 'hello',
        };

        expectedUser.thoughtsArray.push(newThought);

        const response = await request(app)
            .post('/users/posthought')
            .send(newThought)
            .set('Cookie', 'loginToken=valid-token');
        expect(response.text).toEqual(`hello was posted successfully!`);
      });

      test('patch fail if new password is invalid', async () => {
        const expectedUser = {
          username: 'bob123',
          email: 'email@email.com',
          password: 'password',
          thoughtsArray: [],
        };

        jwt.verify.mockReturnValueOnce({
          username: expectedUser.username,
        });

        const changedInfo = {
          newEmail: "newEmail@gmail.com",
          newPassword: "newPassword"
        }

        const response = await request(app)
            .patch('/users')
            .send(changedInfo)
            .set('Cookie', 'loginToken=valid-token');
        expect(response.text).toContain('fails to match the required pattern');
      });

      test('patch succeeds if all updated fields are valid', async () => {
        const expectedUser = {
          username: 'bob123',
          email: 'email@email.com',
          password: 'password',
          thoughtsArray: [],
        };

        jwt.verify.mockReturnValueOnce({
          username: expectedUser.username,
        });

        const changedInfo = {
          newEmail: "newEmail@gmail.com",
          newPassword: "newPassword123!"
        }

        const response = await request(app)
            .patch('/users')
            .send(changedInfo)
            .set('Cookie', 'loginToken=valid-token');
        expect(response.body.message).toEqual('updated successfully');
        expect(response.body.data.email).not.toEqual(expectedUser.email);
        expect(response.body.data.email).toEqual(changedInfo.newEmail);
      });
    });
  });
