import React, { useState, useEffect } from "react";
import axios from "axios";

const AcademicRecords = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({ studentId: "", subject: "", grade: "" });
  const [studentId, setStudentId] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://cpmsapp-q59f2p6k.b4a.run/api/academic-records"; // Replace with your backend endpoint



  // Fetch records for a student
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${studentId}`);
      setRecords(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching records");
    } finally {
      setLoading(false);
    }
  };



  // Add or update record
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
     
        
        await axios.put(`${API_URL}/${editingRecord._id}`, formData);
      } else {
      
        
        await axios.post(API_URL, formData);
      }
      fetchRecords();
      setFormData({ studentId: "", subject: "", grade: "" });
      setEditingRecord(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error saving record");
    }
  };

  // Delete record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchRecords();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting record");
    }
  };



  // Edit record
  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({ studentId: record.studentId, subject: record.subject, grade: record.grade });
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Academic Records</h1>



   
   
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button onClick={fetchRecords} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

     
     
      {error && <p className="text-red-500 mb-4">{error}</p>}

  
  
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Subject</th>
              <th className="border border-gray-300 px-4 py-2">Grade</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td className="border border-gray-300 px-4 py-2">{record.subject}</td>
                <td className="border border-gray-300 px-4 py-2">{record.grade}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(record)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

 
 
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-bold mb-2">{editingRecord ? "Edit Record" : "Add Record"}</h2>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Grade"
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editingRecord ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AcademicRecords;
