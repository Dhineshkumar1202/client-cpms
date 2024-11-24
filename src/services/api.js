import axios from "axios";

// Axios Instance
const API = axios.create({
    baseURL: "http://localhost:5000/",
});

// Generic Error Handler
const handleError = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data;
    } catch (error) {
        console.error("API call failed:", error.response?.data || error.message);
        throw error;
    }
};

// Interview API calls
export const scheduleInterview = (data) =>
    handleError(() => API.post("/api/interviews", data));

export const getInterviewById = (interviewId) =>
    handleError(() => API.get(`/interviews/${interviewId}`));

// Job API calls
export const createJob = (data) =>
    handleError(() => API.post("/jobs", data));

export const getAllJobs = () =>
    handleError(() => API.get("/jobs"));

export const getJobById = (jobId) =>
    handleError(() => API.get(`/jobs/${jobId}`));

export const updateJob = (jobId, data) =>
    handleError(() => API.put(`/jobs/${jobId}`, data));

export const deleteJob = (jobId) =>
    handleError(() => API.delete(`/jobs/${jobId}`));

// Company API calls
export const registerCompany = (data) =>
    handleError(() => API.post("/api/company/register", data));

export const loginCompany = (data) =>
    handleError(() => API.post("/api/company/login", data));

export const getCompanyDetails = (companyId) =>
    handleError(() => API.get(`/api/company/${companyId}`));

export const updateCompanyDetails = (companyId, data) =>
    handleError(() => API.put(`/api/company/${companyId}`, data));

export const deleteCompanyAccount = (companyId) =>
    handleError(() => API.delete(`/api/company/${companyId}`));
