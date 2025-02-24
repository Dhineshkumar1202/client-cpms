import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    department: '',
    year: '',
    course: '',
    userId: '', 
  });
  const [message, setMessage] = useState('');
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
      const response = await axios.post(
        'https://cpmsapp-q59f2p6k.b4a.run/api/profile',
        formData
      );
      setMessage('Profile created successfully!');
      setFormData({
        name: '',
        email: '',
        age: '',
        department: '',
        year: '',
        course: '',
        userId: '',
      });
      setTimeout(() => {
        navigate('/student-dashboard');
      }, 2000);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Unable to create profile'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Your Profile</h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes('success') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your age"
            required
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your department"
            required
          />
        </div>

        {/* Year */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your year (e.g., 2024)"
            required
          />
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Course</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your course (e.g., B.Tech)"
            required
          />
        </div>

        {/* User ID */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter your User ID"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded text-white ${
            loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
