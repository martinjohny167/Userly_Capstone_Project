import api from './axiosConfig';

// User API service
const userService = {
  // Authentication
  login: async (credentials) => {
    try {
<<<<<<< HEAD
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
=======
      console.log('Attempting login with:', { email: credentials.email });
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      
      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
>>>>>>> source-repo/main
      throw error;
    }
  },

  register: async (userData) => {
    try {
<<<<<<< HEAD
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
=======
      console.log('Attempting registration with:', { email: userData.email });
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
>>>>>>> source-repo/main
      throw error;
    }
  },

  // Get all users
  getUsers: async () => {
    try {
      const response = await api.get('/users');
<<<<<<< HEAD
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
=======
      console.log('Fetched users:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
>>>>>>> source-repo/main
      throw error;
    }
  },

  // Get a single user by ID
  getUser: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update an existing user
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  }
};

export default userService; 