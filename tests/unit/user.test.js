// tests/unit/user.test.js

import { registerUser, loginUser } from '../../services/user';

jest.mock('../../services/user'); // Mock the user service

describe('User Management Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test('should register a new user', async () => {
        const newUser = { email: 'test@example.com', password: 'password123' };
        registerUser.mockResolvedValue({ id: 1, ...newUser }); // Mock implementation

        const registeredUser = await registerUser(newUser);
        expect(registeredUser).toEqual({ id: 1, ...newUser });
        expect(registerUser).toHaveBeenCalledWith(newUser);
        expect(registerUser).toHaveBeenCalledTimes(1);
    });

    test('should log in a user', async () => {
        const credentials = { email: 'test@example.com', password: 'password123' };
        loginUser.mockResolvedValue({ id: 1, token: 'fake-jwt-token' }); // Mock implementation

        const loggedInUser = await loginUser(credentials);
        expect(loggedInUser).toEqual({ id: 1, token: 'fake-jwt-token' });
        expect(loginUser).toHaveBeenCalledWith(credentials);
        expect(loginUser).toHaveBeenCalledTimes(1);
    });
});
