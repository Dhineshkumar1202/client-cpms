import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Ensure this is correct
import ErrorBoundary from "./components/ErrorBoundry";

// Lazy loading pages and components
const Home = React.lazy(() => import("./pages/Home"));
const Signup = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const JobListings = React.lazy(() => import("./features/jobs/JobListings"));
const JobForm = React.lazy(() => import("./features/jobs/JobForm"));
const JobUpdateForm = React.lazy(() => import("./pages/JobUpdateForm"));

// Import the Placement Drive Components
const CreatePlacementDrive = React.lazy(() => import("./features/PlacementDrive/CreatePlacementDrive"));
const PlacementDriveReport = React.lazy(() => import("./features/PlacementDrive/PlacementDreiveReport"));

function App() {
  const { isAuthenticated } = useAuth(); // Accessing the isAuthenticated value from context

  // ProtectedRoute checks if the user is authenticated before accessing certain pages
  const ProtectedRoute = ({ element }) =>
    isAuthenticated ? element : <Navigate to="/login" />;

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/jobs"
              element={<ProtectedRoute element={<JobListings />} />}
            />
            <Route
              path="/create-job"
              element={<ProtectedRoute element={<JobForm />} />}
            />
            <Route
              path="/update-job/:jobId"
              element={<ProtectedRoute element={<JobUpdateForm />} />}
            />

            {/* Placement Drive Routes */}
            <Route
              path="/create-placement-drive"
              element={<ProtectedRoute element={<CreatePlacementDrive />} />}
            />
            <Route
              path="/placement-drive/:driveId/report"
              element={<ProtectedRoute element={<PlacementDriveReport />} />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
