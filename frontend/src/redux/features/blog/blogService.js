import axios from "axios";


export const BACKEND_URL = process.env.
REACT_APP_BACKEND_URL;

const API_URl = `${BACKEND_URL}/api/blogs`

 //Create new blogs
  const createblog = async (formData) =>{
    const response = await axios.post(API_URl,formData)
    return response.data
 };

 // Get all blogs
const getblogs = async () => {
    const response = await axios.get(API_URl);
    return response.data;
  };

  // Delete a blog
const deleteblog = async (id) => {
   const response = await axios.delete(API_URL + id);
   return response.data;
 };
 // Get a blog
 const getblog = async (id) => {
   const response = await axios.get(API_URL + id);
   return response.data;
 };
 // Update blog
 const updateblog = async (id, formData) => {
   const response = await axios.patch(`${API_URL}${id}`, formData);
   return response.data;
 };

 const blogService = {

   createblog,
   getblog,
   getblogs,
   deleteblog,
   updateblog,
  };


 export default blogService;



