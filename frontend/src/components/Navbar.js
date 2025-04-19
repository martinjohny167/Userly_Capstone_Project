import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">User Management System</Link>
      </div>
      
      <ul className="navbar-nav">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">Add User</Link>
            </li>
            <li className="nav-item user-info">
              <span>Welcome, {currentUser?.name || 'User'}</span>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar; 