import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState } = useAuth(); 
  const navigate = useNavigate();

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      const role = localStorage.getItem("role");
      if (role === "student") navigate("/dashboard/student");
      else if (role === "admin") navigate("/dashboard/admin");
      else if (role === "company") navigate("/dashboard/company");
    }
  }, [navigate]);

  const handleLogin = async (email, password) => {
    try {
      console.log("Sending payload:", { email, password });
      const response = await axios.post("http://localhost:5000/api/students/login", { email, password });
      console.log("Response received:", response.data);

      const { token, role } = response.data;

      if (!role) {
        throw new Error("Role is missing from the response");
      }

      // Store the token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Update authentication state
      setAuthState({ isAuthenticated: true, role });

      // Redirect based on role
      if (role === "student") {
        navigate("/dashboard/student");
      } else if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "company") {
        navigate("/dashboard/company");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid credentials");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
