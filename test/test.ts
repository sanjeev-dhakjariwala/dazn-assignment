// // Import necessary modules and dependencies for testing
// import request from 'supertest';
// import app from '../server/app'; // Assuming your app instance is exported from app.ts
// import { generateToken } from '../utils/generate.jwt';
// import { admin } from '../middlewares/check.admin';
// import Movie from '../database/models/Movie'; // Assuming your movie model is exported from Movie.ts

// describe('API Endpoints', () => {
//   // Test GET / endpoint
//   describe('GET /', () => {
//     it('should return server started message', async () => {
//       const response = await request(app).get('/');
//       expect(response.status).toBe(200);
//       expect(response.body.success).toBe(true);
//       expect(response.body.message).toBe('Server started successfully!!!');
//     });
//   });

//   // Test POST /api/token endpoint
//   describe('POST /api/token', () => {
//     it('should generate JWT token and set it as HTTP-only cookie', async () => {
//       const response = await request(app).post('/api/token');
//       expect(response.status).toBe(201); // Assuming successful token generation returns 201 status code
//       // Assert the presence of HTTP-only cookie named 'jwt'
//       expect(response.header['set-cookie']).toContain('jwt');
//     });
//   });

//   // Test middleware function to check if user is admin
//   describe('Admin Middleware', () => {
//     it('should call next() if user is admin', () => {
//       const req: any = { cookies: { jwt: 'valid_jwt_token' } };
//       const res: any = {};
//       const nextMock = jest.fn();
//       admin(req, res, nextMock);
//       expect(nextMock).toHaveBeenCalled();
//     });

//     it('should return 401 status if user is not admin', () => {
//       const req: any = { cookies: { jwt: 'valid_jwt_token' } };
//       const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
//       const nextMock = jest.fn();
//       admin(req, res, nextMock);
//       expect(res.status).toHaveBeenCalledWith(401);
//       expect(res.send).toHaveBeenCalled();
//     });
//   });

//   // Test utility function to generate JWT token
//   describe('generateToken Utility Function', () => {
//     it('should generate JWT token and set it as HTTP-only cookie', () => {
//       const mockResponse: any = {
//         cookie: jest.fn()
//       };
//       const userId = { role: 'admin' };
//       generateToken(mockResponse, userId);
//       // Assert the presence of HTTP-only cookie named 'jwt'
//       expect(mockResponse.cookie).toHaveBeenCalledWith(
//         'jwt',
//         expect.any(String),
//         expect.any(Object)
//       );
//     });

//     it('should throw error if unable to generate token', () => {
//       const mockResponse: any = {};
//       const userId = { role: 'admin' };
//       expect(() => generateToken(mockResponse, userId)).toThrow(
//         'Not able to generate token'
//       );
//     });
//   });
// });

// // Integration tests for movie routes and controller functions can be added here
