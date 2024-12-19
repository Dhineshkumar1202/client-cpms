import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth(); // Get setUser from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://cpmsapp-q59f2p6k.b4a.run/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and role to localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", data.role);

        console.log("Login successful, role:", data.role);

        // Update authState using setUser
        setUser({ token: data.token, role: data.role });

        // Redirect based on role
        if (data.role === "student") {
          navigate("/student-dashboard");
        } else if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "company") {
          navigate("/company-dashboard");
        } else {
          alert("Invalid role detected. Please contact support.");
          localStorage.clear();
        }
      } else {
        console.error("Login failed:", data.message);
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome Back!</h2>
      <p>Please log in to access your account.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <div className="login-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
    </form>
  );
};

export default LoginForm;
