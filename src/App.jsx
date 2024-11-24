import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Ensure this context is set up correctly
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRouteWithRole from "./components/PrivateRouteWithRole";

// Lazy loading pages and components
const Home = React.lazy(() => import("./pages/Home"));
const Signup = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const StudentDashboard = React.lazy(() => import("./pages/StudentDashboardPage"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDahboardPage"));
const CompanyDashboard = React.lazy(() => import("./pages/CompanyDashboardPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const JobListings = React.lazy(() => import("./features/Company/JobListings"));
const JobForm = React.lazy(() => import("./features/Student/JobForm"));
const JobUpdateForm = React.lazy(() => import("./features/Student/JobUpdateForm"));

// Import the Placement Drive Components
const CreatePlacementDrive = React.lazy(() => import("./features/PlacementDrive/CreatePlacementDrive"));
const PlacementDriveReport = React.lazy(() => import("./features/Admin/PlacementDreiveReport"));

function App() {
  const { isAuthenticated, role } = useAuth(); // Assuming role is fetched from AuthContext

  // ProtectedRoute for authentication
  const ProtectedRoute = ({ element }) =>
    isAuthenticated ? element : <Navigate to="/login" replace />;

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Role-Based Protected Routes */}
            <Route
              path="/dashboard/student"
              element={
                <PrivateRouteWithRole
                  element={<StudentDashboard />}
                  allowedRole="student"
                />
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <PrivateRouteWithRole
                  element={<AdminDashboard />}
                  allowedRole="admin"
                />
              }
            />
            <Route
              path="/dashboard/company"
              element={
                <PrivateRouteWithRole
                  element={<CompanyDashboard />}
                  allowedRole="company"
                />
              }
            />

            {/* Additional Protected Routes */}
            <Route path="/jobs" element={<ProtectedRoute element={<JobListings />} />} />
            <Route path="/create-job" element={<ProtectedRoute element={<JobForm />} />} />
            <Route path="/update-job/:jobId" element={<ProtectedRoute element={<JobUpdateForm />} />} />

            {/* Placement Drive Routes */}
            <Route
              path="/create-placement-drive"
              element={
                <PrivateRouteWithRole
                  element={<CreatePlacementDrive />}
                  allowedRole="admin"
                />
              }
            />
            <Route
              path="/placement-drive/:driveId/report"
              element={
                <PrivateRouteWithRole
                  element={<PlacementDriveReport />}
                  allowedRole="admin"
                />
              }
            />

            {/* Catch-all Route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
