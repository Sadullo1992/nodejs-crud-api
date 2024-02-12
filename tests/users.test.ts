import request from 'supertest';
import 'dotenv/config';
import startServer from '../src/server';
import { MSG_POST_USER_400 } from '../src/constants';

const app = startServer();

// GET /api/users test with 3 senario
describe('GET /api/users', () => {
  afterAll(() => {
    app.close();
  });
  it('should get responce status code 200', async () => {
    return request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
  it('should return empty array', async () => {
    return request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toEqual(0);
      });
  });
  it('should return array', async () => {
    return request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });
});

// POST api/users test with 3 senario
describe('POST /api/users', () => {
  afterAll(() => {
    app.close();
  });
  it('should create a user', async () => {
    const mockUserData = {
      username: 'Alex',
      age: 23,
      hobbies: [],
    };
    return request(app)
      .post('/api/users')
      .send(mockUserData)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
  it('should return status code 400 When invalid user data', async () => {
    return request(app)
      .post('/api/users')
      .send({ username: 'John' })
      .expect('Content-Type', /json/)
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  it('should return message When invalid user data', async () => {
    return request(app)
      .post('/api/users')
      .send({ username: 'John' })
      .expect('Content-Type', /json/)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(MSG_POST_USER_400);
      });
  });
});