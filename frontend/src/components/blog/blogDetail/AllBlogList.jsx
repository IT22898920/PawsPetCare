import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../../../redux/features/blog/blogSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AllBlogList.css'; // Make sure to create this CSS file

const AllBlogList = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector(state => state.blog);
    console.log('Blogs from state:', blogs); // Should log the data once fetched
    
    
    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch])

    useEffect(() => {
        dispatch(getBlogs());
        if (isError) {
            toast.error(message);
        }
    }, [dispatch, isError, message]);
    
    useEffect(() => {
        console.log(blogs); // Log the blogs data to see what you are getting here
    }, [blogs]);
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!blogs.length) {
        return <p>No blogs found!</p>;
    }

    return (
        <div className="blog-grid">
            {blogs.map(blog => (
                <div key={blog.id} className="blog-card">
                    <h3>{blog.title}</h3>
                    <img src={blog.image.filePath} alt={blog.title} />
                    <p>{blog.description}</p>
                </div>
            ))}
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default AllBlogList;
