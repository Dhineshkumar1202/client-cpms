import axios from 'axios';

const BASE_URL = 'https://cpmsapp-q59f2p6k.b4a.run/api/academic-records/';

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
