const request = require("supertest");
const app = require("../../server");
const User = require("../../models/user");
require("@babel/register");


describe('User Registration and Login', () => {
  let authToken; // To store the authentication token for login

  // User registration test case
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe99@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe('johndoe99@example.com');
  });

  // User login test case
  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'johndoe99@example.com',
        password: 'password123',
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    authToken = response.body.token;
  });

  // Protected route test case (requires authentication)
  it('should access a protected route with authentication', async () => {
    const response = await request(app)
      .get('/api/weather')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('johndoe99@example.com');
  });
});
