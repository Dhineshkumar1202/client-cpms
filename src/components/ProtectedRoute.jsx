import React from 'react';
import { Navigate } from 'react-router-dom';


const isTokenExpired = (token) => {
  if (!token) return true;
  
  const decodedToken = JSON.parse(atob(token.split('.')[1])); 
  const currentTime = Math.floor(Date.now() / 1000);  
  return decodedToken.exp < currentTime; 
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  
  if (!token || isTokenExpired(token) || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

 
  return children;
};

export default ProtectedRoute;
