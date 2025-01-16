import React, { useEffect, useState } from 'react';
import { fetchStudentProfile, updateStudentProfile } from '../services/api';

const StudentProfile = ({ studentId }) => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    academicRecords: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchStudentProfile(studentId);
        setProfile(data);
        setFormData({
          name: data.name || '',
          contact: data.contact || '',
          academicRecords: data.academicRecords || '',
        });
      } catch (err) {
        setError(err.message);
      }
    };
    loadProfile();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateStudentProfile(studentId, formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <p><strong>Academic Records:</strong> {profile.academicRecords}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Academic Records</label>
            <textarea
              name="academicRecords"
              value={formData.academicRecords}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default StudentProfile;
