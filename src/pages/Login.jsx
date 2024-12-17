import React, { useState } from "react";
import { useHistory } from "react-router-dom";  // Assuming react-router for navigation

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();  // To navigate to the dashboard

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        // Store the token and role in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect based on user role
        if (data.role === "student") {
          history.push("/student-dashboard");
        } else if (data.role === "admin") {
          history.push("/admin-dashboard");
        } else if (data.role === "company") {
          history.push("/company-dashboard");
        }
      } else {
        alert(data.message);  // Show error message if credentials are incorrect
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
