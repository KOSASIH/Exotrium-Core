// config/config.js

const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Determine the environment
const environment = process.env.NODE_ENV || 'development';

// Load environment-specific configuration
const envConfig = require(path.join(__dirname, 'environment', `${environment}.js`));

// Main configuration object
const config = {
    app: {
        port: process.env.PORT || 3000,
        name: process.env.APP_NAME || 'MyApp',
    },
    db: {
        uri: process.env.MONGODB_URI || envConfig.db.uri,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET || envConfig.jwt.secret,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
    ...envConfig, // Spread environment-specific settings
};

module.exports = config;
