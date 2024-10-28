// scripts/seed.js

const mongoose = require('mongoose');
const { User, Item } = require('../models'); // Import your Mongoose models
require('dotenv').config();

async function seedDatabase() {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await Item.deleteMany({});

    // Seed users
    const users = [
        { email: 'user1@example.com', password: 'password123' },
        { email: 'user2@example.com', password: 'password123' },
    ];
    await User.insertMany(users);
    console.log('Users seeded.');

    // Seed items
    const items = [
        { name: 'Item 1', price: 100, owner: users[0]._id },
        { name: 'Item 2', price: 200, owner: users[1]._id },
    ];
    await Item.insertMany(items);
    console.log('Items seeded.');

    // Close the database connection
    await mongoose.disconnect();
}

seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
