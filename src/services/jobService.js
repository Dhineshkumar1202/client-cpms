import axios from "axios";

const API_URL = "https://cpmsapp-q59f2p6k.b4a.run/api/jobs"; 

export const fetchJobs = async () => {
  try {
    const token = localStorage.getItem("token");

    // Debugging: Check if token is stored properly
    console.log("Frontend Token:", token);

    if (!token) {
      console.error("Authentication error: No token found.");
      throw new Error("User is not authenticated.");
    }

    const response = await axios.get(`${API_URL}/get`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure proper format
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error fetching jobs.");
  }
};

export const createJob = async (jobData) => {
  try {
    const token = localStorage.getItem("token");

    // Debugging: Check token before sending request
    console.log("Stored Token:", token);
    
    if (!token) {
      console.error("Authentication error: No token found.");
      throw new Error("User is not authenticated.");
    }

    const response = await axios.post(
      `${API_URL}/create`,
      jobData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure correct format
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Job creation error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error creating the job.");
  }
};
