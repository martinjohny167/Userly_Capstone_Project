const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

module.exports = app;
