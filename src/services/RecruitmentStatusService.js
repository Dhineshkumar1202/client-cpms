import axios from "axios";

const BASE_URL = "https://appcollege-jsbz09o3.b4a.run/api";  

export const getRecruitmentStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recruitment-status`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching recruitment status");
  }
};
