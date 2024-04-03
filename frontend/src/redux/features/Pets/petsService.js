
import axios from "axios";

 export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

 const API_URl = `${BACKEND_URL}/api/petAdoption`;

 //Create new Pets
  const createPets = async (formData) =>{
    const response = await axios.post(API_URl,formData)
    return response.data;
 
 };

 const petsService = {

    createPets,
 };

 export default petsService;



