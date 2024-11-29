import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for better UX
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!password) {
      alert("Password cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const { token, role } = response.data;

      // Save token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Update auth state
      setAuthState({ isAuthenticated: true, role });

      // Redirect based on role
      if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "student") {
        navigate("/dashboard/student");
      } else if (role === "company") {
        navigate("/dashboard/company");
      }
      
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      console.error("Login error:", message);
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
