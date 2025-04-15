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
    // Clear error when user starts typing
    if (error) setError(null);
=======
<<<<<<< HEAD
=======
    // Clear error when user starts typing
    if (error) setError(null);
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

<<<<<<< HEAD
=======
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
    try {
      setLoading(true);
      setError(null);
      
<<<<<<< HEAD
      console.log('Submitting login form:', { email: formData.email });
=======
<<<<<<< HEAD
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
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
<<<<<<< HEAD
=======
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
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
      setError(
        err.response?.data?.message || 
        err.message || 
        'Login failed. Please check your credentials and try again.'
      );
<<<<<<< HEAD
=======
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        
<<<<<<< HEAD
=======
<<<<<<< HEAD
        {error && <div className="error-message">{error}</div>}
=======
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
        {error && (
          <div className="error-message" onClick={() => setError(null)}>
            {error}
            <span className="close-error">&times;</span>
          </div>
        )}
<<<<<<< HEAD
=======
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
        
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
            autoComplete="email"
=======
<<<<<<< HEAD
=======
            autoComplete="email"
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
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
            autoComplete="current-password"
=======
<<<<<<< HEAD
=======
            autoComplete="current-password"
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
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