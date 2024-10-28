// services/paymentGateway.js

const API_URL = 'https://api.example.com/payments'; // Replace with actual API URL

export const processPayment = async (paymentData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in local storage
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            throw new Error('Payment processing failed');
        }

        const data = await response.json();
        return data; // Return payment confirmation data
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error; // Rethrow the error for further handling
    }
};

export const refundPayment = async (paymentId) => {
    try {
        const response = await fetch(`${API_URL}/refund`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ paymentId }),
        });

        if (!response.ok) {
            throw new Error('Refund processing failed');
        }

        const data = await response.json();
        return data; // Return refund confirmation data
    } catch (error) {
        console.error('Error processing refund:', error);
        throw error; // Rethrow the error for further handling
    }
};
