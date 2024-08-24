// src/api/auth.js
import axios from 'axios';

export const registerCompany = async (companyData) => {
  try {
    const response = await axios.post('/api/register', companyData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};
