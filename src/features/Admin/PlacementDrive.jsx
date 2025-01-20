import React, { useState, useEffect } from "react";
import axios from "axios";

const PlacementDrives = () => {
  const [placementDrives, setPlacementDrives] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
    eligibilityCriteria: "",
    package: "",
    location: "",
    date: "",
  });
  const [editingDrive, setEditingDrive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://cpmsapp-q59f2p6k.b4a.run/api/placement-drives";

  // Fetch all placement drives
  const fetchPlacementDrives = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPlacementDrives(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching placement drives");
    } finally {
      setLoading(false);
    }
  };




  // Add or update a placement drive
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDrive) {
      
        

        await axios.put(`${API_URL}/${editingDrive._id}`, formData);
      } else {
       
        

        await axios.post(API_URL, formData);
      }
      fetchPlacementDrives();
      setFormData({
        companyName: "",
        jobTitle: "",
        jobDescription: "",
        eligibilityCriteria: "",
        package: "",
        location: "",
        date: "",
      });
      setEditingDrive(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error saving placement drive");
    }
  };

  // Delete 
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPlacementDrives();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting placement drive");
    }
  };

  // Edit 
  
  const handleEdit = (drive) => {
    setEditingDrive(drive);
    setFormData({
      companyName: drive.companyName,
      jobTitle: drive.jobTitle,
      jobDescription: drive.jobDescription,
      eligibilityCriteria: drive.eligibilityCriteria,
      package: drive.package,
      location: drive.location,
      date: new Date(drive.date).toISOString().split("T")[0], // Format date for input
    });
  };

  useEffect(() => {
    fetchPlacementDrives();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Placement Drives</h1>

   
   
      {error && <p className="text-red-500 mb-4">{error}</p>}

      
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">Job Title</th>
              <th className="border border-gray-300 px-4 py-2">Package</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {placementDrives.map((drive) => (
              <tr key={drive._id}>
                <td className="border border-gray-300 px-4 py-2">{drive.companyName}</td>
                <td className="border border-gray-300 px-4 py-2">{drive.jobTitle}</td>
                <td className="border border-gray-300 px-4 py-2">{drive.package}</td>
                <td className="border border-gray-300 px-4 py-2">{drive.location}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(drive.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(drive)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(drive._id)}
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
        <h2 className="text-xl font-bold mb-2">{editingDrive ? "Edit Placement Drive" : "Add Placement Drive"}</h2>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Job Description"
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Eligibility Criteria"
            value={formData.eligibilityCriteria}
            onChange={(e) => setFormData({ ...formData, eligibilityCriteria: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Package"
            value={formData.package}
            onChange={(e) => setFormData({ ...formData, package: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editingDrive ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default PlacementDrives;
