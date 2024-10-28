// utils/constants.js

export const API_BASE_URL = 'https://api.example.com'; // Base URL for API requests

export const ERROR_MESSAGES = {
    USER_NOT_FOUND: 'User  not found.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    REQUIRED_FIELD: 'This field is required.',
    SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
};

export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
};

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
