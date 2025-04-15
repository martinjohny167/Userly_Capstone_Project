-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS usermanagement;

-- Use the database
USE usermanagement;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin', 'manager') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample data (optional)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2b$10$6s7tuRz3BlMcIK.wqP.UeuAoNMFH.qQN1mJQVSWhJvfCPq92FRTxS', 'admin'),
('Regular User', 'user@example.com', '$2b$10$6s7tuRz3BlMcIK.wqP.UeuAoNMFH.qQN1mJQVSWhJvfCPq92FRTxS', 'user'),
('Manager User', 'manager@example.com', '$2b$10$6s7tuRz3BlMcIK.wqP.UeuAoNMFH.qQN1mJQVSWhJvfCPq92FRTxS', 'manager');

-- Note: The hashed passwords above are for 'password123'. You should use a different password in production. 