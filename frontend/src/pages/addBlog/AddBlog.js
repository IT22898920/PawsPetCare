import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import BlogForm from '../../components/blogForm/BlogForm';
import {
  createBlog,
  selectIsLoading,
} from "../../redux/features/blog/blogSlice";

const initialState = {
  name: "",
  title: "",
};

const AddBlog = () => {
  const [blog, setBlog] = useState(initialState);
  const [blogImage, setBlogImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  const { name, title } = blog;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    setBlogImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", blogImage);

    console.log(...formData);

    await dispatch(createBlog(formData));

    navigate("/blog-dashboard");
  };

  return (
    <div className="add-blog-page">
      {isLoading && <Loader />}
      <h3 className="add-blog-title">Add New Blog</h3>
      <BlogForm
        blog={blog}
        blogImage={blogImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveBlog={saveBlog}
      />
    </div>
  );
};

export default AddBlog;
