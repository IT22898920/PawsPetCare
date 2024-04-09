import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../redux/features/blog/blogSlice";
import BlogList from "../../components/blog/blogList/BlogList";
import BlogSummary from "../../components/blog/blogSummary/BlogSummary"; // Adjust import based on actual file name

const BlogDashboard = () => {
  const dispatch = useDispatch();
  const { blog, isLoading, isError, message } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);

  // Ensure you are passing `blog` correctly to `BlogSummary`
  return (
    <div>
      <h2>Blog Dashboard</h2>
      <BlogSummary blog={blog} />
      <BlogList blog={blog} isLoading={isLoading} />
    </div>
  );
};

export default BlogDashboard;
