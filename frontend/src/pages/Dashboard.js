import React, { useState, useEffect } from 'react';
import UserModal from '../components/UserModal';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('All');
  const [currentUserRole, setCurrentUserRole] = useState('Administrator'); // Default to Administrator for demo
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock user data (since we're not connecting to backend)
  useEffect(() => {
    const mockUsers = [
      { id: 1, username: 'admin', role: 'Administrator', lastLogin: '2023-10-15', email: 'admin@example.com' },
      { id: 2, username: 'johndoe', role: 'User', lastLogin: '2023-10-14', email: 'john@example.com' },
      { id: 3, username: 'janedoe', role: 'User', lastLogin: '2023-10-13', email: 'jane@example.com' },
      { id: 4, username: 'manager1', role: 'Manager', lastLogin: '2023-10-12', email: 'manager@example.com' },
      { id: 5, username: 'support1', role: 'Support', lastLogin: '2023-10-11', email: 'support@example.com' }
    ];
    
    // Simulate API call delay
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 800);
  }, []);

  // Filter users based on selected role
  const filteredUsers = roleFilter === 'All' 
    ? users 
    : users.filter(user => user.role === roleFilter);

  // Count users by role
  const roleCount = (role) => users.filter(user => user.role === role).length;

  // Function to handle edit action
  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setShowModal(true);
    }
  };

  // Function to handle save in modal
  const handleSaveUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setShowModal(false);
    setSelectedUser(null);
    alert(`User ${updatedUser.username} updated successfully!`);
  };

  // Function to handle delete action
  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      alert(`User deleted successfully!`);
    }
  };

  // Switch between admin and non-admin view (for demo purposes)
  const toggleUserRole = () => {
    setCurrentUserRole(currentUserRole === 'Administrator' ? 'User' : 'Administrator');
  };

  return (
    <div className="dashboard-container">
      <h1>User Management Dashboard</h1>
      
      {/* Demo toggle for admin/non-admin view */}
      <div className="role-toggle">
        <button onClick={toggleUserRole} className="role-toggle-btn">
          Currently viewing as: {currentUserRole} (click to toggle)
        </button>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Admins</h3>
          <p>{roleCount('Administrator')}</p>
        </div>
        <div className="stat-card">
          <h3>Regular Users</h3>
          <p>{roleCount('User')}</p>
        </div>
        <div className="stat-card">
          <h3>Managers</h3>
          <p>{roleCount('Manager')}</p>
        </div>
        <div className="stat-card">
          <h3>Support</h3>
          <p>{roleCount('Support')}</p>
        </div>
      </div>
      
      <div className="user-list-section">
        <div className="user-list-header">
          <h2>User List</h2>
          <div className="filter-container">
            <label htmlFor="roleFilter">Filter by Role:</label>
            <select 
              id="roleFilter" 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              className="role-filter"
            >
              <option value="All">All Roles</option>
              <option value="Administrator">Administrator</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Support">Support</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.role}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    {currentUserRole === 'Administrator' && (
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filteredUsers.length === 0 && !loading && (
          <p className="no-results">No users found with the selected role.</p>
        )}
      </div>

      {/* User Edit Modal */}
      {showModal && (
        <UserModal 
          user={selectedUser}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default Dashboard; 