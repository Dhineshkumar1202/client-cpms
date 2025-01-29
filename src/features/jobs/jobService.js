import axios from "axios";

const API_URL = "https://cpmsapp-q59f2p6k.b4a.run/api/jobs"; 

export const fetchJobs = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching jobs.");
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(
      `${API_URL}/`,
      jobData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creating the job.");
  }
};
