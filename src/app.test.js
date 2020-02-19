const app = require('./app');
const request = require('supertest');

/* eslint-disable */
describe('/', () => {
  test('GET should return a list of endpoints', async (done) => {
    const {body: response} = await request(app)
        .get('/')
        .expect(200)
    expect(response).toEqual({
      '0': 'GET /users',
      '1': 'GET /users/:username',
      '2': 'GET /users/:username',
      '3': 'POST /users/login',
      '4': 'PATCH /users/:username',
      '5': 'DELETE /users/:username',
      '6': 'POST /users/:username/tweets',
      '7': 'DELETE /users/:username/tweets',
    });
    done();
  });
});
