// config/environment/production.js

module.exports = {
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp_prod', // Production database URI
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'prod-secret-key', // Production JWT secret
    },
    logging: {
        level: 'error', // Logging level for production
    },
    features: {
        enableFeatureX: false, // Disable specific features in production
    },
};
