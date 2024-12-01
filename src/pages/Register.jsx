import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'student', // Default role
    branch: '',
    graduationYear: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Initialize useNavigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      setSuccess(response.data.message);  // success message from backend
      setError(null);  // clear any previous error
      
      // Navigate to login page after successful signup
      setTimeout(() => {
        navigate('/login');  // Redirect to login page
      }, 2000); // Add a delay (2 seconds) for the success message to show before redirecting
    } catch (err) {
      setError(err.response.data.message);  // error message from backend
      setSuccess(null);  // clear any previous success message
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Branch"
            required
          />
          <input
            type="number"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            placeholder="Graduation Year"
            required
          />
        </div>
        <button type="submit">Signup</button>
        <p className="switch-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
