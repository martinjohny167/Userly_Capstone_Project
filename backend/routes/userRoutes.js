// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// // Database connection configuration
// const dbConfig = {
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'root',
//   database: process.env.DB_NAME || 'usermanagement',
//   port: parseInt(process.env.DB_PORT) || 3306,
//   charset: 'utf8mb4'
// };

// // Create MySQL connection pool
// const pool = mysql.createPool(dbConfig);

// // Authentication Routes
// router.post('/auth/register', async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Name, email and password are required' });
//     }
//     const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (existingUsers.length > 0) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }
//     const validRoles = ['user', 'admin', 'manager'];
//     const userRole = validRoles.includes(role) ? role : 'user';
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const [result] = await pool.query(
//       'INSERT INTO users (name, email, role, password) VALUES (?, ?, ?, ?)',
//       [name, email, userRole, hashedPassword]
//     );
//     res.status(201).json({
//       message: 'User registered successfully',
//       user: {
//         id: result.insertId,
//         name,
//         email,
//         role: userRole
//       }
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Failed to register user' });
//   }
// });

// router.post('/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }
//     const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (users.length === 0) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const user = users[0];
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const { password: _, ...userWithoutPassword } = user;
//     res.json({
//       message: 'Login successful',
//       user: userWithoutPassword
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Failed to authenticate user' });
//   }
// });

// // User CRUD Routes
// router.get('/users', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT id, name, email, role FROM users');
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Failed to fetch users' });
//   }
// });

// router.get('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(rows[0]);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Failed to fetch user' });
//   }
// });

// router.post('/users', async (req, res) => {
//   try {
//     const { name, email, role, password } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Name, email and password are required' });
//     }
//     const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (existingUsers.length > 0) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }
//     const validRoles = ['user', 'admin', 'manager'];
//     const userRole = validRoles.includes(role) ? role : 'user';
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const [result] = await pool.query(
//       'INSERT INTO users (name, email, role, password) VALUES (?, ?, ?, ?)',
//       [name, email, userRole, hashedPassword]
//     );
//     res.status(201).json({
//       id: result.insertId,
//       name,
//       email,
//       role: userRole
//     });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Failed to create user' });
//   }
// });

// router.put('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, role, password } = req.body;
//     const [existingUsers] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
//     if (existingUsers.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const updates = [];
//     const values = [];
//     if (name) {
//       updates.push('name = ?');
//       values.push(name);
//     }
//     if (email) {
//       updates.push('email = ?');
//       values.push(email);
//     }
//     if (role) {
//       const validRoles = ['user', 'admin', 'manager'];
//       if (validRoles.includes(role)) {
//         updates.push('role = ?');
//         values.push(role);
//       }
//     }
//     if (password) {
//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);
//       updates.push('password = ?');
//       values.push(hashedPassword);
//     }
//     if (updates.length === 0) {
//       return res.status(400).json({ message: 'No valid fields to update' });
//     }
//     values.push(id);
//     await pool.query(
//       `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
//       values
//     );
//     const [updatedUser] = await pool.query(
//       'SELECT id, name, email, role FROM users WHERE id = ?',
//       [id]
//     );
//     res.json(updatedUser[0]);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ message: 'Failed to update user' });
//   }
// });

// router.delete('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Failed to delete user' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

module.exports = router;
