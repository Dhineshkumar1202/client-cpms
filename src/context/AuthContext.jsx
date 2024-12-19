import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    role: null,
    token: null,
  });

  // Set user and store token/role in localStorage
  const setUser = (userData) => {
    const token = userData.token || localStorage.getItem("authToken");
    const role = userData.role || localStorage.getItem("userRole");
    const user = userData.user || null; // You can set user data if it's available

    // Store token and role in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);

    // Set authState
    setAuthState({
      user,
      isAuthenticated: !!token,
      role,
      token,
    });
  };

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const user = JSON.parse(localStorage.getItem("userData")); // You may store and retrieve user data if needed

    if (token && role) {
      setAuthState({
        user: user || null,
        isAuthenticated: true,
        role,
        token,
      });
    }
  }, []);

  // Logout function to clear local storage and reset authState
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData"); // Optional if you're storing user data

    setAuthState({
      user: null,
      isAuthenticated: false,
      role: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
