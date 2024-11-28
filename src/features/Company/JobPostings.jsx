import React, { useState } from "react";
import axios from "axios";

const JobPostings = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    applicationDeadline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");// Assume JWT is stored here
      const response = await axios.post(
        "/api/jobs/create",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        applicationDeadline: "",
      });
    } catch (err) {
      console.error("Error posting job:", err.response?.data || err.message);
      alert("Failed to post the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobPostings;
