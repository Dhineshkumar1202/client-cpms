import axios from "axios";

const API_URL = "https://cpmsapp-q59f2p6k.b4a.run/api/jobs"; 

export const fetchJobs = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated.");
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error.response ? error.response.data : error.message);
    throw new Error("Error fetching jobs.");
  }
};

export const createJob = async (jobData) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      throw new Error("User is not authenticated.");
    }

    const response = await axios.post(
      `${API_URL}/create`,
      jobData,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Job creation error:", error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || "Error creating the job.");
  }
};
