import React, { useState, useEffect } from 'react';

const UserModal = ({ user, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    username: '',
    role: 'User',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        role: user.role || 'User',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, ...userData });
  };

  if (!user) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit User</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="user@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="User">User</option>
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="Support">Support</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal; 