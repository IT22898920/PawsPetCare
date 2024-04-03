import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};
const fetchReorderedProducts = async () => {
  // Adjust the URL as necessary
  const response = await axios.get(`${API_URL}reordered`);
  return response.data;
};
const updateProductQuantity = async (productId, newQuantity) => {
  const response = await axios.patch(`/api/products/${productId}`, {
    quantity: newQuantity
  });
  return response.data; // Assuming your API responds with the updated product
};


const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  fetchReorderedProducts,
  updateProductQuantity,
};

export default productService;