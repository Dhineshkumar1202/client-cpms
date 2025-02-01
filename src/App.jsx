import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Signup from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboardPage";
import AdminDashboard from "./pages/AdminDahboardPage";
import CompanyDashboard from "./pages/CompanyDashboardPage";
import ProfilePage from "./pages/ProfilePage";
import JobList from "./features/jobs/JobList";
import JobForm from "./features/Admin/JobForm";
import JobDetail from "./features/jobs/JobDetail";
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

      {/* Protected Route for Student Dashboard */}
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

      {/* Profile Route */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Protected Route for Admin Dashboard */}
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

      {/* Protected Route for Company Dashboard */}
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

      {/* Job Listing Route (Available for All Authenticated Users) */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <JobList />
          </ProtectedRoute>
        }
      />

      {/* Job Detail Route (Available for All Authenticated Users) */}
      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <JobDetail />
          </ProtectedRoute>
        }
      />

      {/* Job Posting Route (Admin Only) */}
      <Route
        path="/post-job"
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <RoleBasedRoute role={authState.role} allowedRoles={["admin"]}>
              <JobForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
