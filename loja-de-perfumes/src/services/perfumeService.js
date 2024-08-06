// src/services/perfumeService.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api/perfumes';

export const getPerfumes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPerfumeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPerfume = async (perfume) => {
  const response = await axios.post(API_URL, perfume);
  return response.data;
};

export const updatePerfume = async (id, perfume) => {
  const response = await axios.put(`${API_URL}/${id}`, perfume);
  return response.data;
};

export const deletePerfume = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
