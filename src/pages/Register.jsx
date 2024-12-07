import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default roles
    department: "",
    grade: "",
    resume: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://appcollege-jsbz09o3.b4a.run/api/auth/register", formData);
      toast.success(response.data.message);
    } catch (error) {
      // Enhanced error handling
      const errorMessage = error.response?.data?.error || "Registration failed";
      if (error.response?.status === 400) {
        toast.error(`Bad Request: ${errorMessage}`);
      } else if (error.response?.status === 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <select name="role" value={formData.role} onChange={handleChange}>
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

      {(formData.role === "admin" || formData.role === "company") && (
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
