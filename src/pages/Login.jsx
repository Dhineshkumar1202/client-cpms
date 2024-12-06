import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Simulating login API call
      const response = await fetch("https://appcollege-jsbz09o3.b4a.run/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save role and token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        // Update the auth state
        setUser({
          ...data.user, // user info
          token: data.token,
        });

        // Redirect to the appropriate dashboard
        if (data.user.role === "student") navigate("/dashboard/student");
        else if (data.user.role === "admin") navigate("/dashboard/admin");
        else if (data.user.role === "company") navigate("/dashboard/company");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
