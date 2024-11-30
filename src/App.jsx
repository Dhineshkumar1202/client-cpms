import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Signup from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboardPage";
import AdminDashboard from "./pages/AdminDahboardPage";
import CompanyDashboard from "./pages/CompanyDashboardPage";


const ProtectedRoute = ({ isAuthenticated, children, redirectTo = "/login" }) => {
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
};


const RoleBasedRoute = ({ role, allowedRoles, children, redirectTo = "/login" }) => {
  return allowedRoles.includes(role) ? children : <Navigate to={redirectTo} replace />;
};

function App() {
  const { authState, setAuthState } = useAuth();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setAuthState({ isAuthenticated: true, role });
    }
  }, [setAuthState]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected and Role-Based Routes */}
      <Route
        path="/dashboard/student"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <RoleBasedRoute role={authState.role} allowedRoles={["student"]}>
              <StudentDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <RoleBasedRoute role={authState.role} allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/company"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <RoleBasedRoute role={authState.role} allowedRoles={["company"]}>
              <CompanyDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
