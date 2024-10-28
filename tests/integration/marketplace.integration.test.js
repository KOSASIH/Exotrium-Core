// tests/integration/marketplace.integration.test.js

import request from 'supertest';
import app from '../../app'; // Import your Express app
import { connectDB, disconnectDB } from '../../config/db'; // Database connection functions

beforeAll(async () => {
    await connectDB(); // Connect to the database before tests
});

afterAll(async () => {
    await disconnectDB(); // Disconnect from the database after tests
});

describe('Marketplace Integration Tests', () => {
    let itemId;

    test('should add an item to the marketplace', async () => {
        const newItem = { name: 'Test Item', price: 100 };

        const response = await request(app)
            .post('/api/marketplace/items')
            .send(newItem)
            .expect(201); // Expecting a 201 Created status

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newItem.name);
        expect(response.body.price).toBe(newItem.price);
        itemId = response.body.id; // Store the item ID for later tests
    });

    test('should retrieve the added item from the marketplace', async () => {
        const response = await request(app)
            .get(`/api/marketplace/items/${itemId}`)
            .expect(200); // Expecting a 200 OK status

        expect(response.body).toHaveProperty('id', itemId);
        expect(response.body.name).toBe('Test Item');
        expect(response.body.price).toBe(100);
    });

    test('should return 404 for a non-existent item', async () => {
        const nonExistentId = '999999999999999999999999'; // Example of a non-existent ID

        const response = await request(app)
            .get(`/api/marketplace/items/${nonExistentId}`)
            .expect(404); // Expecting a 404 Not Found status

        expect(response.body.message).toBe('Item not found.');
    });
});
