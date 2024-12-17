import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (!token) {
    return <Redirect to="/login" />;
  }
  
  return (
    <Route
      {...rest}
      render={(props) =>
        (role === "student" && rest.path === "/student-dashboard") || 
        (role === "admin" && rest.path === "/admin-dashboard") ||
        (role === "company" && rest.path === "/company-dashboard") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
