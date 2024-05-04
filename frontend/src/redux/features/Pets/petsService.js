import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/petAdoption/`;

 //Create new pets
const createPet = async (formData) =>{
  const response = await axios.post(API_URL, formData)
  return response.data
};


 // Get all pets
 const getPets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


 // delete pets
 const deletepets = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

 // get a pets
 const getPet = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
 
 
const petsService = {
  createPet,
  getPets,
  getPet,
  deletepets,
};

export default petsService;



