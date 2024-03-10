import request from 'supertest';
import app from '../server/app';

describe('app', () => {
  it('respond with a not found message', (done) => {
    request(app)
      .get('/random')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          success: true,
          message: 'Server started successfully!!!'
        },
        done
      );
  });
});
