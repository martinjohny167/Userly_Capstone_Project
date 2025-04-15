import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user on initial load
  useEffect(() => {
    const checkLoggedIn = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
<<<<<<< HEAD
=======
<<<<<<< HEAD
        
=======
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
<<<<<<< HEAD
=======
<<<<<<< HEAD
        // Clear potentially corrupted data
=======
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

<<<<<<< HEAD
  // Login function - simplified without token
=======
<<<<<<< HEAD
  // Login function
=======
  // Login function - simplified without token
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  // Context value
=======
>>>>>>> source-repo/main
>>>>>>> ade78267cbc48e0678f5330b01ba6901ba801f27
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
}; 