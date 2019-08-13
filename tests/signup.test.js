const request = require('supertest');
const faker = require('faker');
const sinon = require('sinon');
const req = require('./mocks/req.mock');
const res = require('./mocks/res.mock');
const app = require('../app');
const User = require('./mocks/user.mock');
const hashPassword = require('./mocks/hash.password.mock');
const { createUserFactory } = require('../app/controllers/signup.controller.js');

describe('Test the signup controller', () => {
  describe('Unit tests - When stubbed', () => {
    // Unit test
    const createUser = createUserFactory(User, hashPassword);

    const body = {
      email: faker.internet.email(),
      password: faker.random.word(),
      passport: faker.random.word(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      type: 'candidate',
    };

    const expected = 200;
    beforeEach(() => {
      req.body = {};
    });
    test('should return 200 as status code', async () => {
      await createUser({ ...req, body }, res);
      expect(res.code).toBe(expected);
    });
  });

  describe('Integration tests', () => {
    // Integration tests
    test('should return 422 with invalid body', done => request(app)
      .post('/signup')
      .send({})
      .then((response) => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('errors');
        done();
      }));

    test('should pass', done => request(app)
      .post('/signup')
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        type: 'candidate',
        password: 'abcdefgh',
        passport: 'sksksksk',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      }));
  });
});
