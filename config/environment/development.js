// config/environment/development.js

module.exports = {
    db: {
        uri: 'mongodb://localhost:27017/myapp_dev', // Development database URI
    },
    jwt: {
        secret: 'dev-secret-key', // Development JWT secret
    },
    logging: {
        level: 'debug', // Logging level for development
    },
    features: {
        enableFeatureX: true, // Enable specific features in development
    },
};
