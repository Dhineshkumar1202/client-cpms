import axios from 'axios';

const API_BASE_URL = 'https://cpmsapp-q59f2p6k.b4a.run/api'; // Replace with your backend base URL

// Fetch student profile by ID
export const fetchStudentProfile = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update student profile
export const updateStudentProfile = async (id, profileData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/students/${id}`, profileData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
