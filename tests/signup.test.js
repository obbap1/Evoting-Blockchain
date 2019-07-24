const request = require('supertest');
const faker = require('faker');
const app = require('../app');

describe('Test the signup controller', () => {
  test('should return 422 with invalid body', done => request(app)
    .post('/signup')
    .send({})
    .then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.body).toHaveProperty('errors');
      done();
    }));
});
