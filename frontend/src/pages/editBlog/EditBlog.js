import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import BlogForm from "../../components/blogForm/BlogForm";
import {
  getBlog,
  getBlogs,
  selectIsLoading,
  selectBlog,
  updateBlog,
} from "../../redux/features/blog/blogSlice";

const EditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const blogEdit = useSelector(selectBlog);

  // Initialize state with default values to ensure all inputs are controlled.
  const [blog, setBlog] = useState({
    title: "", // Default empty string, adjust according to your data model
    // Include other properties with defaults as needed, matching your blog model
  });
  const [blogImage, setBlogImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  // Fetch blog data when component mounts or id changes.
  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [dispatch, id]);

  // Update local state when blogEdit changes, e.g., after fetching data.
  useEffect(() => {
    if (blogEdit) {
      setBlog(blogEdit);
      setImagePreview(blogEdit.image ? `${blogEdit.image.filePath}` : null);
      setDescription(blogEdit.description ? blogEdit.description : "");
    }
  }, [blogEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlogImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("description", description);
    if (blogImage) {
      formData.append("image", blogImage);
    }

    await dispatch(updateBlog({ id, formData }));
    await dispatch(getBlogs());
    navigate("/blog-dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Blog</h3>
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

export default EditBlog;
