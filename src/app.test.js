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
      '3': 'POST /users/login',
      '4': 'PATCH /users/:username',
      '5': 'PATCH /users/',
      '6': 'POST /users/posthough',
      '7': 'DELETE /users/:username/tweets',
      '8': 'DELETE /users',
    });
    done();
  });

  describe('/logout', () => {
    test('logout notifies user with logout message', async () => {
      const response = await request(app)
          .post('/logout')
          .expect(200);
      expect(response.text).toEqual('You are now logged out!');
    });
});
})