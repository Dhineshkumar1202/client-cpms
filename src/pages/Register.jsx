import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Loading state for better UX
  const navigate = useNavigate();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Name cannot be empty.");
      return;
    }
    if (!isEmailValid(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!formData.password) {
      alert("Password cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(response.data.message);
      navigate("/login"); // Redirect to Login page after signup
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed. Please try again.";
      console.error("Signup error:", message);
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
        <p>
          Already have an account?{" "}
          <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
