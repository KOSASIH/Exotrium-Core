// utils/validators.js

/**
 * Validate an email address.
 * @param {string} email - Email address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Validate a password.
 * @param {string} password - Password to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one number and one letter
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
};

/**
 * Check if a string is empty.
 * @param {string} str - String to check.
 * @returns {boolean} - True if empty, false otherwise.
 */
export const isEmpty = (str) => {
    return !str || str.trim().length === 0;
};

/**
 * Validate a phone number.
 * @param {string} phone - Phone number to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const validatePhoneNumber = (phone) => {
    const regex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return regex.test(phone);
};
