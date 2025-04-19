import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../api/userService';
import { useAuth } from '../context/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user deletion
  const handleDelete = async (id) => {
    // Check if current user is an admin
    if (currentUser?.role !== 'admin') {
      setError('Only administrators can delete users');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        // Remove the deleted user from state
        setUsers(users.filter(user => user.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete user. Please try again.');
        console.error('Error deleting user:', err);
      }
    }
  };

  // Function to navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Function to clear error message
  const clearError = () => {
    setError(null);
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      
      {error && (
        <div className="error-message" onClick={clearError}>
          {error}
          <span className="close-error">&times;</span>
        </div>
      )}
      
      {users.length === 0 ? (
        <p>No users found. Add some users to get started.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button 
                    className="button button-edit" 
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="button button-danger" 
                    onClick={() => handleDelete(user.id)}
                    title={currentUser?.role !== 'admin' ? 'Only admins can delete users' : 'Delete user'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList; 