const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.test' });

async function setupTestDatabase() {
  // Create connection without database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    charset: 'utf8mb4'
  });

  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME_TEST}`);
    console.log(`Database ${process.env.DB_NAME_TEST} created or already exists`);

    // Always use the test database
    await connection.query(`USE ${process.env.DB_NAME_TEST}`);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin', 'manager') DEFAULT 'user'
      )
    `);
    console.log('Users table created or already exists');

    console.log('Test database setup completed successfully');
  } catch (error) {
    console.error('Error setting up test database:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

setupTestDatabase(); 