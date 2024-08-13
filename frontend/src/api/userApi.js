import axios from 'axios';

const API_URL = '/api/users';

// Register user
export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}`, { name, email, password });
  return response.data;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// Forgot password
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

// Reset password
export const resetPassword = async (resetToken, password) => {
  const response = await axios.put(`${API_URL}/reset-password/${resetToken}`, { password });
  return response.data;
};
