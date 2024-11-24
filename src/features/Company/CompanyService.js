import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Register a new company
export const registerCompany = async (companyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/companies/register`, companyData);
    return response.data;
  } catch (error) {
    throw new Error(`Error registering company: ${error.response?.data?.message || error.message}`);
  }
};

// Login a company
export const loginCompany = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/companies/login`, credentials);
    return response.data; // Contains token
  } catch (error) {
    throw new Error(`Error logging in: ${error.response?.data?.message || error.message}`);
  }
};

// Update company details
export const updateCompany = async (companyId, companyData, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/companies/${companyId}`, companyData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating company: ${error.response?.data?.message || error.message}`);
  }
};
