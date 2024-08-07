// src/services/categoryService.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api/categories';

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
