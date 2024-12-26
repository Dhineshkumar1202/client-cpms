import axios from 'axios';

const API_URL = 'https://cpmsapp-q59f2p6k.b4a.run/api/placement-drives/';

export const createPlacementDrive = async (data) => {
  try {
    const response = await axios.post(`${API_URL}create`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error creating placement drive');
  }
};

export const getPlacementDriveReport = async (driveId) => {
  try {
    const response = await axios.get(`${API_URL}${driveId}/report`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching placement drive report');
  }
};
