// This file will be used to connect to the backend API
// For now, it uses mock data and simulated responses

// Mock users data for development
const mockUsers = [
  { id: 1, username: 'admin', role: 'Administrator', lastLogin: '2023-10-15', email: 'admin@example.com' },
  { id: 2, username: 'johndoe', role: 'User', lastLogin: '2023-10-14', email: 'john@example.com' },
  { id: 3, username: 'janedoe', role: 'User', lastLogin: '2023-10-13', email: 'jane@example.com' },
  { id: 4, username: 'manager1', role: 'Manager', lastLogin: '2023-10-12', email: 'manager@example.com' },
  { id: 5, username: 'support1', role: 'Support', lastLogin: '2023-10-11', email: 'support@example.com' }
];

// Simulate API response delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API URL - to be used when backend is connected
const API_URL = '/api';

// User service functions
export const userService = {
  // Get all users
  getUsers: async () => {
    // Simulate API call
    await delay(800);
    return [...mockUsers];
  },
  
  // Get user by ID
  getUserById: async (id) => {
    await delay(500);
    const user = mockUsers.find(user => user.id === id);
    if (!user) throw new Error('User not found');
    return { ...user };
  },
  
  // Create new user
  createUser: async (userData) => {
    await delay(800);
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      lastLogin: new Date().toISOString().split('T')[0]
    };
    return { ...newUser };
  },
  
  // Update user
  updateUser: async (id, userData) => {
    await delay(800);
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) throw new Error('User not found');
    
    const updatedUser = {
      ...mockUsers[userIndex],
      ...userData
    };
    return { ...updatedUser };
  },
  
  // Delete user
  deleteUser: async (id) => {
    await delay(800);
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) throw new Error('User not found');
    return { success: true };
  },
  
  // Login user
  login: async (credentials) => {
    await delay(1000);
    const { username, password } = credentials;
    
    // This is only for demonstration - in real app, authentication would be handled by the backend
    if (username === 'admin' && password === 'admin123') {
      return {
        user: {
          id: 1,
          username: 'admin',
          role: 'Administrator'
        },
        token: 'mock-jwt-token'
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  // Register new user
  register: async (userData) => {
    await delay(1000);
    return {
      user: {
        id: mockUsers.length + 1,
        username: userData.username,
        role: userData.role
      },
      token: 'mock-jwt-token'
    };
  }
};

export default userService; 