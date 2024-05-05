import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/useradoptions/`;

// Create  userAdoption
const createUserAdoption = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
  };

const userAdoptionService = {
    createUserAdoption,
}

export default userAdoptionService
