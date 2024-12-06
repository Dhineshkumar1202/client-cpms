import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default role
    department: "",
    grade: "",
    resume: "",
    username: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://appcollege-jsbz09o3.b4a.run/api/auth/register",
        formData
      );
      toast.success(response.data.message);
      navigate("/login"); // Navigate to the login page after successful registration
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <select name="role" onChange={handleChange}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
        <option value="company">Company</option>
      </select>

      {formData.role === "student" && (
        <>
          <input
            type="text"
            name="department"
            placeholder="Department"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="resume"
            placeholder="Resume Link"
            onChange={handleChange}
          />
        </>
      )}

      {(formData.role === "admin" || formData.role === "company") && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
