// Updated AuthContext.jsx
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
    const token = userData.token || localStorage.getItem("authToken");
    const role = userData.role || localStorage.getItem("userRole");

  



 
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);





    setAuthState({
      user: userData,
      isAuthenticated: !!token,
      role,
      token,
    });
  };






  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

 

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
    console.log("Logging out. Clearing authState and localStorage.");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

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
