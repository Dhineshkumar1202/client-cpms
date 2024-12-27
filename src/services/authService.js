import axios from 'axios';

const API_URL = 'https://cpmsapp-q59f2p6k.b4a.run/auth';

export const signup = async (formData) => {
    return axios.post(`${API_URL}/signup`, formData);
};

export const login = async (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};
