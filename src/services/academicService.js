import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/academic-records/';

export const fetchAcademicRecords = async (studentId) => {
  try {
    const response = await axios.get(`${BASE_URL}${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching academic records', error);
    throw error;
  }
};

export const syncAcademicRecords = async (studentId, records) => {
  try {
    const response = await axios.post(`${BASE_URL}${studentId}/sync`, records);
    return response.data;
  } catch (error) {
    console.error('Error syncing academic records', error);
    throw error;
  }
};
