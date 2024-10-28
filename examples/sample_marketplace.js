// examples/sample_marketplace.js

const axios = require('axios');

// Base URL for the marketplace API
const API_BASE_URL = 'https://api.example.com/marketplace';

// Function to list all products
async function listProducts() {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        console.log('Available Products:', response.data);
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
}

// Function to create a new order
async function createOrder(productId, quantity) {
    try {
        const orderData = {
            productId,
            quantity,
            userId: '12345', // Example user ID
        };
        const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
        console.log('Order Created:', response.data);
    } catch (error) {
        console.error('Error creating order:', error.message);
    }
}

// Function to fetch order details
async function getOrderDetails(orderId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
        console.log('Order Details:', response.data);
    } catch (error) {
        console.error('Error fetching order details:', error.message);
    }
}

// Example usage
(async () => {
    console.log('Listing Products...');
    await listProducts();

    console.log('Creating Order...');
    await createOrder('product-123', 2);

    console.log('Fetching Order Details...');
    await getOrderDetails('order-456');
})();
