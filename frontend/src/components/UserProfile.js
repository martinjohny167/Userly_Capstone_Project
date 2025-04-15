import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    role: user?.role || 'User'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save changes to API
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  if (!user) {
    return <div className="profile-container">User not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
        <button 
          className={isEditing ? "cancel-btn" : "edit-profile-btn"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
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
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={userData.role}
              disabled
            />
            <small className="help-text">Role cannot be changed by the user</small>
          </div>
          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-field">
            <span className="field-label">Username:</span>
            <span className="field-value">{userData.username}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Email:</span>
            <span className="field-value">{userData.email || 'Not provided'}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Role:</span>
            <span className="field-value">{userData.role}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Joined:</span>
            <span className="field-value">{user.joined || 'Unknown'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 