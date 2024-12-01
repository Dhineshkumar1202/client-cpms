import React, { createContext, useState, useEffect, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    role: null, // can be "student", "admin", or "company"
    user: null,
    token: null,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Optionally, you can fetch the user from the backend to verify the token
      setAuthState({
        isAuthenticated: true,
        role: localStorage.getItem('role'), // Assume the role is stored in localStorage
        user: localStorage.getItem('user'),
        token: storedToken,
      });
    }
  }, []);

  const login = (userData, authToken, role) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("role", role);
    localStorage.setItem("user", userData);

    setAuthState({
      isAuthenticated: true,
      role: role,
      user: userData,
      token: authToken,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setAuthState({
      isAuthenticated: false,
      role: null,
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
