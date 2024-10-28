// examples/sample_user.js

const axios = require('axios');

// Base URL for the user management API
const API_BASE_URL = 'https://api.example.com/users';

// Function to create a new user
async function createUser(username, email, password) {
    try {
        const userData = {
            username,
            email,
            password,
        };
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        console.log('User Created:', response.data);
    } catch (error) {
        console.error('Error creating user:', error.message);
    }
}

// Function to fetch user details
async function getUserDetails(userId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`);
        console.log('User Details:', response.data);
    } catch (error) {
        console.error('Error fetching user details:', error.message);
    }
}

// Function to update user information
async function updateUser(userId, updatedData) {
    try {
        const response = await axios.put(`${API_BASE_URL}/${userId}`, updatedData);
        console.log('User Updated:', response.data);
    } catch (error) {
        console.error('Error updating user:', error.message);
    }
}

// Example usage
(async () => {
    console.log('Creating User...');
    await createUser('john_doe', 'john@example.com', 'securepassword123');

    console.log('Fetching User Details...');
    await getUserDetails('user-123');

    console.log('Updating User...');
    await updateUser('user-123', { email: 'john.doe@example.com' });
})();
