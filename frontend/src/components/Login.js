import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../api/userService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
<<<<<<< HEAD
=======
    // Clear error when user starts typing
    if (error) setError(null);
>>>>>>> source-repo/main
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
<<<<<<< HEAD
=======
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

>>>>>>> source-repo/main
    try {
      setLoading(true);
      setError(null);
      
<<<<<<< HEAD
      const response = await userService.login(formData);
      
      // Store user data in context
      login(response.user);
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
=======
      console.log('Submitting login form:', { email: formData.email });
      const response = await userService.login(formData);
      
      if (response.user) {
        console.log('Login successful:', { id: response.user.id, email: response.user.email });
        login(response.user);
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Login failed. Please check your credentials and try again.'
      );
>>>>>>> source-repo/main
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        
<<<<<<< HEAD
        {error && <div className="error-message">{error}</div>}
=======
        {error && (
          <div className="error-message" onClick={() => setError(null)}>
            {error}
            <span className="close-error">&times;</span>
          </div>
        )}
>>>>>>> source-repo/main
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
<<<<<<< HEAD
=======
            autoComplete="email"
>>>>>>> source-repo/main
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
<<<<<<< HEAD
=======
            autoComplete="current-password"
>>>>>>> source-repo/main
          />
        </div>
        
        <button 
          type="submit" 
          className="button button-primary" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login; 