import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://example.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (formData) => {
  return await apiClient.post('/auth/signup', formData);
};

export const login = async (formData) => {
  return await apiClient.post('/auth/login', formData);
};
