import 'jest';
import { app } from '@/server';

describe('Example', () => {
  afterAll(async () => {
    await app.getApp().close();
  });

  it('should not create a user', async () => {
    const response = await app.getApp().inject({
      method: 'POST',
      url: '/example/user/create',
      payload: {
        email: 'test.com',
        name: 'jon doe'
      }
    });

    expect(response.statusCode).toBe(400);
  });

  it('should create a user', async () => {
    const response = await app.getApp().inject({
      method: 'POST',
      url: '/example/user/create',
      payload: {
        email: 'test@testemail.com',
        name: 'jon doe'
      }
    });

    expect(response.statusCode).toBe(200);
  });
});
