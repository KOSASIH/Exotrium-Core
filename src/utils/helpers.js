// utils/helpers.js

/**
 * Generate a random string of specified length.
 * @param {number} length - Length of the random string.
 * @returns {string} - Random string.
 */
export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

/**
 * Format a date to a readable string.
 * @param {Date} date - Date object to format.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Deep clone an object.
 * @param {Object} obj - Object to clone.
 * @returns {Object} - Cloned object.
 */
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
