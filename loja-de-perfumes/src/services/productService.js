import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products';

export const getProducts = async (filter = {}) => {
  const query = new URLSearchParams(filter).toString();
  const response = await axios.get(`${API_URL}?${query}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
