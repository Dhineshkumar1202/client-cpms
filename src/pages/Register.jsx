import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    department: "",
    grade: "",
    resume: "",
    username: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register", // Adjust the URL if needed
        formData
      );
      toast.success(response.data.message);
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
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      {/* Name */}
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

      {/* Role-specific fields */}
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
            type="text"
            name="resume"
            placeholder="Resume Link"
            value={formData.resume}
            onChange={handleChange}
          />
        </>
      )}

      {formData.role !== "student" && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
