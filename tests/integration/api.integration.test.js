// tests/integration/api.integration.test.js

import request from 'supertest';
import app from '../../app'; // Import your Express app
import { connectDB, disconnectDB } from '../../config/db'; // Database connection functions

beforeAll(async () => {
    await connectDB(); // Connect to the database before tests
});

afterAll(async () => {
    await disconnectDB(); // Disconnect from the database after tests
});

describe('API Integration Tests', () => {
    test('should register a new user', async () => {
        const newUser = { email: 'test@example.com', password: 'password123' };

        const response = await request(app)
            .post('/api/users/register')
            .send(newUser)
            .expect(201); // Expecting a 201 Created status

        expect(response.body).toHaveProperty('id');
        expect(response.body.email).toBe(newUser.email);
    });

    test('should log in a user', async () => {
        const credentials = { email: 'test@example.com', password: 'password123' };

        const response = await request(app)
            .post('/api/users/login')
            .send(credentials)
            .expect(200); // Expecting a 200 OK status

        expect(response.body).toHaveProperty('token'); // Expecting a token in the response
    });

    test('should return 401 for invalid login', async () => {
        const invalidCredentials = { email: 'wrong@example.com', password: 'wrongpassword' };

        const response = await request(app)
            .post('/api/users/login')
            .send(invalidCredentials)
            .expect(401); // Expecting a 401 Unauthorized status

        expect(response.body.message).toBe('Invalid email or password.');
    });
});
