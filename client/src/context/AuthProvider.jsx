import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create Auth Context
const AuthContext = createContext();

// Hook to use Auth Context
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [lastActive, setLastActive] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('chat-user'));
    if (savedUser) {
      setAuthUser(savedUser);
    }

    // Token refresh every 5 minutes
    const tokenRefreshInterval = setInterval(() => {
      refreshToken();
    }, 300000); // 300000 ms = 5 minutes

    // Inactivity timeout after 5 minutes
    const handleInactivity = () => {
      const inactivityTimeout = setTimeout(() => {
        logout(); // Logout if inactive for 5 minutes
      }, 300000); // 5 minutes

      // Clear previous timeout and set a new one each time activity is detected
      return inactivityTimeout;
    };

    // Handle activity reset
    const resetInactivityTimer = () => {
      setLastActive(Date.now());
      const inactivityTimeout = handleInactivity();
      clearTimeout(inactivityTimeout); // Clear the previous timeout and reset
    };

    // Listen to mouse move and key press events for activity detection
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);

    // Initial inactivity timeout
    let inactivityTimeout = handleInactivity();

    return () => {
      clearInterval(tokenRefreshInterval);
      clearTimeout(inactivityTimeout);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Login function: Sets user and stores in localStorage
  const login = (user) => {
    setAuthUser(user);
    localStorage.setItem('chat-user', JSON.stringify(user));
    setLastActive(Date.now());
    navigate('/dashboard');
  };

  // Logout function: Clears user data from state and localStorage
  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('chat-user');
    navigate('/');
  };

  // Function to refresh token (add your logic to refresh here)
  const refreshToken = () => {
    if (authUser) {
      console.log('Refreshing token...');
      // Add your token refresh API call logic here
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
