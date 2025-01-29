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
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setMessage("");

    try {
      await createJob(job);
      setMessage("✅ Job posted successfully!");
      setJob({
        title: "",
        description: "",
        subject: "",
        location: "",
        applicationDeadline: "",
      });
    } catch (error) {
      setMessage("❌ Error posting the job: " + error.response?.data?.message || error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
      
      {message && <p className={`text-center ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "description", "subject", "location", "applicationDeadline"].map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type={field === "applicationDeadline" ? "date" : "text"}
              name={field}
              value={job[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
