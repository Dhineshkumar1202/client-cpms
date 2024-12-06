import axios from "axios";


const API = axios.create({
    baseURL: "https://appcollege-jsbz09o3.b4a.run/",
});


const handleError = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data;
    } catch (error) {
        console.error("API call failed:", error.response?.data || error.message);
        throw error;
    }
};


export const scheduleInterview = (data) =>
    handleError(() => API.post("https://appcollege-jsbz09o3.b4a.run/api/interviews", data));

export const getInterviewById = (interviewId) =>
    handleError(() => API.get(`https://appcollege-jsbz09o3.b4a.run/interviews/${interviewId}`));


export const createJob = (data) =>
    handleError(() => API.post("https://appcollege-jsbz09o3.b4a.run/jobs", data));

export const getAllJobs = () =>
    handleError(() => API.get("https://appcollege-jsbz09o3.b4a.run/jobs"));

export const getJobById = (jobId) =>
    handleError(() => API.get(`https://appcollege-jsbz09o3.b4a.run/jobs/${jobId}`));

export const updateJob = (jobId, data) =>
    handleError(() => API.put(`https://appcollege-jsbz09o3.b4a.run/jobs/${jobId}`, data));

export const deleteJob = (jobId) =>
    handleError(() => API.delete(`https://appcollege-jsbz09o3.b4a.run/jobs/${jobId}`));


export const registerCompany = (data) =>
    handleError(() => API.post("https://appcollege-jsbz09o3.b4a.run/api/company/register", data));

export const loginCompany = (data) =>
    handleError(() => API.post("https://appcollege-jsbz09o3.b4a.run/api/company/login", data));

export const getCompanyDetails = (companyId) =>
    handleError(() => API.get(`https://appcollege-jsbz09o3.b4a.run/api/company/${companyId}`));

export const updateCompanyDetails = (companyId, data) =>
    handleError(() => API.put(`https://appcollege-jsbz09o3.b4a.run/api/company/${companyId}`, data));

export const deleteCompanyAccount = (companyId) =>
    handleError(() => API.delete(`https://appcollege-jsbz09o3.b4a.run/api/company/${companyId}`));
