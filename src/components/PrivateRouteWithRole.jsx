import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRouteWithRole = ({ element, allowedRole, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); 

  if (!token) {
    return <Navigate to="/login" />;
  }

  
  if (userRole !== allowedRole) {
    return <Navigate to="/" />; 
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRouteWithRole;
