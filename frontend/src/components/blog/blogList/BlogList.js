import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./BlogList.scss";
import SearchBlog from "../../search-blog/SearchBlog"; // Component
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BLOG, selectFilteredblog } from "../../../redux/features/blog/blogFilterSlice";
import ReactPaginate from 'react-paginate';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteBlog, getBlogs } from "../../../redux/features/blog/blogSlice";

const BlogList = ({ blog, isLoading }) => {
    const [searchBlog, setSearchBlog] = useState(""); 
    const filteredblog = useSelector(selectFilteredblog);
    const dispatch = useDispatch();

    const shortenText = (text, n) => {
        if (typeof text !== 'string') return '';
        return text.length > n ? `${text.substring(0, n)}...` : text;
    };
    
    // Pagination state
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    
    // Fetch and filter blogs
    useEffect(() => {
        if (blog) {
            console.log(blog); // This will show you the structure of `blog`
            dispatch(FILTER_BLOG({ blog, searchBlog }));        }
    }, [blog, searchBlog, dispatch]);

    // Handle pagination
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredblog.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredblog.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredblog]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredblog.length;
        setItemOffset(newOffset);
    };

    const delBlog = async (id) => {
        console.log(id);
        await dispatch(deleteBlog(id));
        await dispatch(getBlogs());
      };
      const confirmDelete = (id) => {
        confirmAlert({
            title: "Delete Blog",
            message: "Are you sure you want to delete this Blog?",
            buttons: [
                {
                    label: "Delete",
                    onClick: () => delBlog(id),
                },
                {
                    label: "Cancel",
                    // No need for an onClick if it just cancels
                },
            ],
        });
    };
    
    


    if (isLoading) return <SpinnerImg />;

    if (!Array.isArray(blog) || blog.length === 0) {
        return <p>-- No blog found, please add a blog --</p>;
    }

    return (
        <div className="blog-list">
            <hr />
            <div className="table">
                <div className="--flex-between --flex-dir-column">
                    <span><h3>blogs</h3></span>
                    <span>
                        <SearchBlog
                            value={searchBlog}
                            onChange={(e) => setSearchBlog(e.target.value)}
                        />
                    </span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>s/n</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => {
                            const { _id, title, description } = item;
                            return (
                                <tr key={_id}>
                                    <td>{index + 1}</td>
                                    <td>{shortenText(title, 20)}</td>
                                    <td>{shortenText(description, 50)}</td>
                                    <td className="icons">
                                        <Link to={`/blog-detail/${_id}`}><AiOutlineEye size={25} color="purple" /></Link>
                                        <Link to={`/edit-blog/${_id}`}><FaEdit size={20} color="green" /></Link>
                                        <FaTrashAlt size={20} color="red" onClick={() => confirmDelete(_id)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
        </div>
    );
};

export default BlogList;
