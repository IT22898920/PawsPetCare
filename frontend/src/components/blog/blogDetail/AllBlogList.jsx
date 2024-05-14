import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../../../redux/features/blog/blogSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AllBlogList.css';
import DOMPurify from 'dompurify';

const AllBlogList = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector(state => state.blog);
    console.log('Blogs from state:', blogs);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!blogs.length) {
        return <p>No blogs found!</p>;
    }

    return (
        <div>
            <h1>Blog Page</h1>
            <div className="blog-grid">
                {blogs.map(blog => (
                    <div key={blog.id} className="blog-card">
                        <img src={blog.image.filePath} alt={blog.title} />
                        <h3>{blog.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.description) }} />
                    </div>
                ))}
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default AllBlogList;