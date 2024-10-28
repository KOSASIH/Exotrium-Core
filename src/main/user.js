// src/main/user.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./models/User'); // Assuming you have a User model defined
const { validateUser , validateLogin } = require('./middleware/validation'); // Validation middleware
const router = express.Router();

// Register a new user
router.post('/register', validateUser , async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if the user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ username, email, password: hashedPassword });
        await newUser .save();

        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User login
router.post('/login', validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get user profile
router.get('/profile', async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have middleware to set req.user
        const user = await User.findById(userId).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user profile
router.put('/profile', async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have middleware to set req.user
        const { username, email } = req.body;

        const updatedUser  = await User.findByIdAndUpdate(userId, { username, email }, { new: true }).select('-password');
        if (!updatedUser ) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.json(updatedUser );
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Password recovery (optional)
router.post('/recover', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }

        // Generate a password reset token (you can implement your own logic here)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        // Send email with the token (implement email sending logic)

        res.json({ message: 'Password recovery email sent' });
    } catch (error) {
        console.error('Error in password recovery:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
