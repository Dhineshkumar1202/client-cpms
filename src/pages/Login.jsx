import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/students/login', formData);
      localStorage.setItem('token', response.data.token); // Store JWT token
      alert(response.data.message);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      alert(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account?{" "}
        <a href="/signup">Sign up here</a> {/* Link to signup */}
      </p>
    </div>
  );
};

export default Login;
