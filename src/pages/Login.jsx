import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      console.log("Login Response:", response.data); // Debug response data
  
      const { token, role } = response.data; // Destructure token and role
      console.log("Token:", token, "Role:", role); // Check values
  
      if (!role) {
        throw new Error("Role is undefined in the response"); // Optional error for clarity
      }
  
      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
  
      // Update AuthContext state
      setAuthState({ isAuthenticated: true, role });
  
      // Navigate based on role
      if (role === "student") {
        navigate("/dashboard/student");
      } else if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "company") {
        navigate("/dashboard/company");
      }
    } catch (error) {
      console.error("Login Error:", error); // Log any error
      setMessage(
        error.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        {message && (
          <div
            className={`text-sm mb-4 ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
