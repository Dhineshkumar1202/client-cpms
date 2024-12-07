import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default to 'student' role
    department: "",
    grade: "",
    resume: "",
    username: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the data to the backend register endpoint
      const response = await axios.post(
        "https://appcollege-jsbz09o3.b4a.run/api/auth/register", // Replace with your actual API URL
        formData
      );
      // On success, show success toast
      toast.success(response.data.message);
    } catch (error) {
      // Error handling with toast notifications
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* User Name */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {/* Role Selection */}
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="student">Student</option>
        <option value="admin">Admin</option>
        <option value="company">Company</option>
      </select>

      {/* Role Specific Fields */}
      {formData.role === "student" && (
        <>
          {/* Department */}
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          
          {/* Grade */}
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={formData.grade}
            onChange={handleChange}
            required
          />
          
          {/* Resume Link */}
          <input
            type="text"
            name="resume"
            placeholder="Resume Link"
            value={formData.resume}
            onChange={handleChange}
          />
        </>
      )}

      {(formData.role === "admin" || formData.role === "company") && (
        <>
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </>
      )}

      {/* Submit Button */}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
