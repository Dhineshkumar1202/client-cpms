import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Signup from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboardPage";
import AdminDashboard from "./pages/AdminDahboardPage"; 
import CompanyDashboard from "./pages/CompanyDashboardPage";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ isAuthenticated, children, redirectTo = "/login" }) => {
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
};

const RoleBasedRoute = ({ role, allowedRoles, children, redirectTo = "/login" }) => {
  return allowedRoles.includes(role) ? children : <Navigate to={redirectTo} replace />;
};

function App() {
  const { authState } = useAuth();

 

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student Dashboard */}
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <RoleBasedRoute role={authState.role} allowedRoles={["student"]}>
              <StudentDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <RoleBasedRoute role={authState.role} allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      {/* Company Dashboard */}
      <Route
        path="/company-dashboard"
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
