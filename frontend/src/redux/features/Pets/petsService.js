import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/petAdoption`;
const apiClient = axios.create({
   baseURL: `${BACKEND_URL}/api/petAdoption`
});
const createPets = async (formData) => {
   try {
     const response = await axios.post(API_URL, formData);
     return response.data;
   } catch (error) {
     console.error("Error creating pets:", error.response?.data || error.message || error);
     throw error.response?.data || error.message || error;  // Pass the error message or data up to the caller
   }
};

const getPets = async () => {
   try {
     const response = await axios.get(API_URL);
     return response.data;
   } catch (error) {
     console.error("Error getting pets:", error.response?.data || error.message || error);
     throw error.response?.data || error.message || error;  // Pass the error message or data up to the caller
   }
};

 
 
const petsService = {
  createPets,
  getPets,
};

export default petsService;



