import React, { useState } from "react";
import axios from "axios";

const JobApplicationForm = () => {
  const [studentId, setStudentId] = useState("");  // ✅ Added studentId
  const [jobId, setJobId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  // ✅ Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("studentId", studentId);  
    formData.append("jobId", jobId);
    formData.append("coverLetter", coverLetter);
    formData.append("file", resume);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://cpmsapp-q59f2p6k.b4a.run/api/job-applications",  
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage(error.response?.data?.message || "Failed to submit the application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Submit Job Application</h2>  {/* ✅ Fixed missing heading */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="studentId" className="block font-medium mb-1">
            Student ID
          </label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="jobId" className="block font-medium mb-1">
            Job ID
          </label>
          <input
            type="text"
            id="jobId"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coverLetter" className="block font-medium mb-1">
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block font-medium mb-1">
            Resume
          </label>
          <input
            type="file"
            id="resume"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full border border-gray-300 rounded px-3 py-2"
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default JobApplicationForm;
