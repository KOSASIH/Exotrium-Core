// services/inventory.js

const API_URL = 'https://api.example.com/inventory'; // Replace with actual API URL

export const getInventoryItems = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in local storage
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch inventory items');
        }

        const data = await response.json();
        return data.items; // Assuming the API returns an array of inventory items
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        throw error; // Rethrow the error for further handling
    }
};

export const updateInventoryItem = async (itemId, updateData) => {
    try {
        const response = await fetch(`${API_URL}/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error('Failed to update inventory item');
        }

        const data = await response.json();
        return data; // Return the updated item data
    } catch (error) {
        console.error('Error updating inventory item:', error);
        throw error; // Rethrow the error for further handling
    }
};
