// src/features/PlacementDrive/placementDriveService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/placement-drives/';

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
