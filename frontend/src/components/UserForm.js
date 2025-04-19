import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../api/userService';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Initial form state
  const initialFormState = {
    name: '',
    email: '',
    role: 'user',
    password: '' // Only required for new users
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch user data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchUser();
    }
  }, [id]);

  // Function to fetch user data for editing
  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await userService.getUser(id);
      // Remove password from form data in edit mode
      const { password, ...userDataWithoutPassword } = userData;
      setFormData(userDataWithoutPassword);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user data. Please try again.');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (isEditMode) {
        // If editing, remove password if it's empty (not being updated)
        const dataToSubmit = { ...formData };
        if (!dataToSubmit.password) {
          delete dataToSubmit.password;
        }
        await userService.updateUser(id, dataToSubmit);
      } else {
        // If creating new user, password is required
        await userService.createUser(formData);
      }
      
      setSuccess(true);
      setError(null);
      
      // Redirect after a brief delay to show success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} user. Please check your input and try again.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} user:`, err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>{isEditMode ? 'Edit User' : 'Add New User'}</h2>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">User successfully {isEditMode ? 'updated' : 'created'}!</div>}
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">
            Password: {isEditMode && '(Leave blank to keep current password)'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            required={!isEditMode}
          />
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="button button-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : isEditMode ? 'Update User' : 'Create User'}
          </button>
          <button
            type="button"
            className="button"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm; 