import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to check token expiration
const isTokenExpired = (token) => {
  if (!token) return true;
  
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
  const currentTime = Math.floor(Date.now() / 1000);  // Current time in seconds
  return decodedToken.exp < currentTime; // Check if the token is expired
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Check if the token is expired or the role is not allowed
  if (!token || isTokenExpired(token) || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // If valid token and role is allowed, render the children
  return children;
};

export default ProtectedRoute;
