import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const API_URL = process.env.REACT_APP_API_URL || "https://appcollege-jsbz09o3.b4a.run";

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error("Name, Email, and Password are required!");
      return false;
    }
    if (formData.role === "student" && (!formData.department.trim() || !formData.grade.trim())) {
      toast.error("Department, Grade, and Username are required for students!");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Send the data to the backend register endpoint
      const response = await axios.post(`${API_URL}/api/auth/register`, formData);
      toast.success(response.data.message);

      // Reset form data after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "student",
        department: "",
        grade: "",
        resume: "",
        username: "",
      });
    } catch (error) {
      // Error handling with toast notifications
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
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
      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
        <option value="company">Company</option>
      </select>

      {/* Role-Specific Fields */}
      {formData.role === "student" && (
        <>
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={formData.grade}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="resume"
            placeholder="Resume Link"
            value={formData.resume}
            onChange={handleChange}
          />
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

      {(formData.role === "admin" || formData.role === "company") && (
        <>
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
