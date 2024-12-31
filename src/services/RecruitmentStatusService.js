import axios from "axios";

 

export const getRecruitmentStatus = async () => {
  try {
    const response = await axios.get(`https://cpmsapp-q59f2p6k.b4a.run/api/recruitment-status`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching recruitment status");
  }
};
