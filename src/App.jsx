import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboardPage';
import AdminDashboard from './pages/AdminDahboardPage';
import CompanyDashboard from './pages/CompanyDashboardPage';

function App() {
  const { authState, setAuthState } = useAuth();
  const navigate = useNavigate();

  // Automatically load authState from localStorage when the app starts
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token && role) {
      setAuthState({ isAuthenticated: true, role });
      // Redirect to the corresponding dashboard based on the role
      if (role === "student") {
        navigate("/dashboard/student");
      } else if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "company") {
        navigate("/dashboard/company");
      }
    }
  }, [setAuthState, navigate]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {authState.isAuthenticated && (
          <>
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/company" element={<CompanyDashboard />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
