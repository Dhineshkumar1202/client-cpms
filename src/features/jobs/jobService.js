import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const fetchAllJobs = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error.response?.data?.message || error.message}`);
  }
};


export const fetchJobsByCompany = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/company`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching company jobs: ${error.response?.data?.message || error.message}`);
  }
};


export const createJob = async (jobData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jobs`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error creating job: ${error.response?.data?.message || error.message}`);
  }
};

export const updateJob = async (jobId, jobData, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/jobs/${jobId}`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating job: ${error.response?.data?.message || error.message}`);
  }
};


export const deleteJob = async (jobId, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting job: ${error.response?.data?.message || error.message}`);
  }
};
