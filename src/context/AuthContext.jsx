import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    role: null,
    token: null,
  });

  const setUser = (userData) => {
    const token = localStorage.getItem("token") || userData.token;
    const role = localStorage.getItem("role") || userData.role;


    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setAuthState({
      user: userData,
      isAuthenticated: !!token,
      role,
      token,
    });
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setAuthState({
        user: null,
        isAuthenticated: true,
        role,
        token,
      });
    }
  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

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
