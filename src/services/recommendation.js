// services/recommendation.js

const API_URL = 'https://api.example.com/recommendations'; // Replace with actual API URL

export const getRecommendations = async (userId) => {
    try {
        const response = await fetch(`${API_URL}?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in local storage
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        return data.recommendations; // Assuming the API returns an array of recommendations
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error; // Rethrow the error for further handling
    }
};
