import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import BlogForm from "../../components/blog/logForm/BlogForm";
import {
  getblog,
  getblogs,
  selectIsLoading,
  selectblog,
  updateblog,
} from "../../redux/features/blog/blogSlice";

const Editblog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const blogEdit = useSelector(selectblog);

  const [blog, setblog] = useState(blogEdit);
  const [blogImage, setblogImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getblog(id));
  }, [dispatch, id]);

  useEffect(() => {
    setblog(blogEdit);

    setImagePreview(
        blogEdit && blogEdit.image ? `${blogEdit.image.filePath}` : null
    );

    setDescription(
        blogEdit && blogEdit.description ?blogEdit.description : ""
    );
  }, [blogEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setblog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    setblogImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveblog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",blog?.name);

    formData.append("title",blog?.title);
   // formData.append("quantity",blog?.quantity);
   // formData.append("price", blog?.price);
    formData.append("description", description);
    if (blogImage) {
      formData.append("image", blogImage);
    }

    console.log(...formData);

    await dispatch(updateblog({ id, formData }));
    await dispatch(getblogs());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit blog</h3>
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

export default Editblog;
