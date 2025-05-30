import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const searchStudents = async (query, limit = 5) => {
  try {
    if (!query || query.length < 3) return [];
    
    const response = await api.get('/students/search', {
      params: { query, limit }
    });
    
    return response.data;
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};