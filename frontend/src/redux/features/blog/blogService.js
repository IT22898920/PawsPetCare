import axios from "axios";


export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/blog/`

 //Create new blogs
  const createBlog = async (formData) =>{
    const response = await axios.post(API_URL, formData)
    return response.data
 };

 // Get all blogs
const getBlogs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  // Delete a blog
const deleteBlog = async (id) => {
   const response = await axios.delete(API_URL + id);
   return response.data;
 };
 // Get a blog
 const getBlog = async (id) => {
   const response = await axios.get(API_URL + id);
   return response.data;
 };
//  // Update blog
//  const updateblog = async (id, formData) => {
//    const response = await axios.patch(${API_URl}${id}, formData);
//    return response.data;
//  };

 const blogService = {

   createBlog,
   getBlogs,
   getBlog,
    deleteBlog,
//    updateblog,
  };


 export default blogService;