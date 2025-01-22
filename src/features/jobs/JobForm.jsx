import React, { useState } from "react";
import { createJob } from "../jobs/jobService";

const JobForm = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    subject: "",
    location: "",
    applicationDeadline: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createJob(job);
      setMessage("Job posted successfully!");
      setJob({
        title: "",
        description: "",
        subject: "",
        location: "",
        applicationDeadline: "",
      });
    } catch (error) {
      setMessage("Error posting the job: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={job.subject}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Application Deadline</label>
          <input
            type="date"
            name="applicationDeadline"
            value={job.applicationDeadline}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
