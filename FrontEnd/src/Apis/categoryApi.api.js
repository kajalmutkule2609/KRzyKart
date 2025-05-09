import axios from "axios";

const API_URL = 'http://localhost:8080/ECommerceWebsite/Category';

// Get all categories
export const getAllCategories = () => {
  return axios.get(`${API_URL}/viewAllCategories`);
};

// Add a new category
export const addCategory = (categoryData) => {
  return axios.post(`${API_URL}/addCategory`, categoryData);
};

// Search category by name
export const searchCategoryByName = (name) => {
  return axios.get(`${API_URL}/searchCategoryByName/${name}`);
};

// Delete category by name
export const deleteCategory = (name) => {
  return axios.delete(`${API_URL}/deleteCategory/${name}`);
};

// Update category by name
export const updateCategory = (name, updatedCategoryData) => {
  return axios.put(`${API_URL}/updateCategory/${name}`, updatedCategoryData);
};
