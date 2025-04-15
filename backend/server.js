const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const path = require('path');
<<<<<<< HEAD
=======
const userRoutes = require('./routes/userRoutes');
>>>>>>> source-repo/main
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

<<<<<<< HEAD
=======
// Mount routes
app.use('/api', userRoutes);

>>>>>>> source-repo/main
// Database connection configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 3306,
  charset: 'utf8mb4'
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Function to close the pool (for testing)
const closePool = async () => {
  try {
    await pool.end();
  } catch (error) {
    console.error('Error closing pool:', error);
  }
};

// Test database connection
const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established successfully!');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

// Only test connection if not in test environment
if (process.env.NODE_ENV !== 'test') {
  testDatabaseConnection();
}

// User Routes

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// GET single user
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// DELETE user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { app, pool, closePool };
