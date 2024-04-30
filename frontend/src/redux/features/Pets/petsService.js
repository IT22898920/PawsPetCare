import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/petAdoption`;

 //Create new blogs
const createPet = async (formData) =>{
  const response = await axios.post(API_URL, formData)
  return response.data
};


 // Get all blogs
 const getPets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

 
 
const petsService = {
  createPet,
  getPets,
};

export default petsService;



