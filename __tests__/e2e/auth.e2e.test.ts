import request from 'supertest';
import { initApp } from '../../src/app'
import { runDB, shutdownDB } from '../../src/utils/db';
import {describe, expect, test} from '@jest/globals';

const signUpCreds = {
  email: 'biba@gmail.com',
  login: 'boba',
  password: 'bobaboba'
};

describe('USERS_TESTS', () => {
  let app: any;

  beforeAll(async () => {
    app = initApp()
    await runDB();
  });

  afterAll(async () => {
    await shutdownDB();
  });

  it('remove all data', async () => {
    await request(app).del('/testing/all-data').expect(204);
  })

  it('should create new user for testing', async () => {
    const res = await request(app)
      .post('/users/')
      .send(signUpCreds)
      .expect(201);
  });
  it('should return auth token', async () => {
    const res = await request(app)
    .post('/auth/login')
    .send({ loginOrEmail: signUpCreds.login, password: signUpCreds.password })
    .expect(200);
    expect(res.body).toHaveProperty('accessToken')
  })
  it('should be able to create comment', async () => {
    const blog = await request(app).post('/blogs')
    .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
    .send({
      name: 'biba',
      description: 'bobo',
      websiteUrl: 'sobakagmail.com',
    }).expect(201);

    const post = await request(app).post('/posts')
    .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
    .send({
      title: 'string',
      shortDescription: 'string',
      content: 'string',
      blogId: blog.body.id,
    }).expect(201)
    const { body: { accessToken }} = await request(app)
    .post('/auth/login')
    .send({ loginOrEmail: signUpCreds.login, password: signUpCreds.password });

    const newComment = await request(app)
    .post(`/posts/${post.body.id}/comments`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ content: 'stringstringstringst' })
    .expect(200);
    expect(newComment.body).toHaveProperty('createdAt')

  })
});