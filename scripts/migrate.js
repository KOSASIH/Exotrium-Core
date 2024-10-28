// scripts/migrate.js

const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'pg', // or 'mysql' or 'sqlite3'
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});

async function migrateDatabase() {
    try {
        console.log('Running migrations...');
        await db.migrate.latest(); // Run the latest migrations
        console.log('Migrations completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally{
        await db.destroy(); // Close the database connection
    }
}

migrateDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
