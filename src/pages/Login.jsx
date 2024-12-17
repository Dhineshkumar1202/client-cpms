import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  

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
      
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

      
        if (data.role === "student") {
          navigate("/student-dashboard");  
        } else if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "company") {
          navigate("/company-dashboard");
        }
      } else {
        alert(data.message);  
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
