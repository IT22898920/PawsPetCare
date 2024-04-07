import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import BlogForm from "../../components/blog/blogForm/BlogForm";
import {
     createBlog,
    selectIsLoading,
  } from "../../redux/features/blog/blogSlice";




const initialState = {
    name: "",
    title: "",
  };

const Addblog = () => {

    const [blog, setblog] = useState(initialState);
    const [blogImage, setblogImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  const { name, title, productImage } = blog;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setblog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    setblogImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

/*
  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

*/
const saveblog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
   // formData.append("sku", generateKSKU(category));
    //formData.append("category", category);
    //formData.append("quantity", Number(quantity));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    

    navigate("/dashboard");
  };





    return(

        <div className="add-blog-page">
        {isLoading && <Loader />}
        <h3 className="add-blog-title">Add New blog</h3>
        <blogForm
          blog={blog}
          blogImage={blogImage}
          imagePreview={imagePreview}
          description={description}
          setDescription={setDescription}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveblog={saveblog}
        />
           </div>
    );
};


export default Addblog;