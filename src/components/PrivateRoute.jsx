// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  // Check if the user has a JWT token in localStorage
  const token = localStorage.getItem('token');

  // If no token, redirect the user to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Otherwise, allow access to the protected route
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
