import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Signup from "./pages/Register"; // Add Signup if needed
import StudentDashboard from "./pages/StudentDashboardPage";
import AdminDashboard from "./pages/AdminDahboardPage";
import CompanyDashboard from "./pages/CompanyDashboardPage";

// Protected Route Wrapper
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const { authState, setAuthState } = useAuth();

  // Automatically load authState from localStorage when the app starts
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
      <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
      
      {/* Protected Routes */}
      <Route
        path="/dashboard/student"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/company"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
