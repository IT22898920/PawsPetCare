import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./blogList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
    FILTER_blog,
    selectFilteredblogs,
  } from "../../../redux/features/blog/filterSlice";
  import ReactPaginate from "react-paginate";
  import { confirmAlert } from "react-confirm-alert";
  import "react-confirm-alert/src/react-confirm-alert.css";
  import {
    deleteblog,
    getblog,
  } from "../../../redux/features/blog/blogSlice";
  import { Link } from "react-router-dom";
  




const blogList = ({ blog, isLoading }) => {
    const [search, setSearch] = useState("");
    const filteredblog = useSelector(selectFilteredblog);
  
    const dispatch = useDispatch();
  
    const shortenText = (text, n) => {
      if (text.length > n) {
        const shortenedText = text.substring(0, n).concat("...");
        return shortenedText;
      }
      return text;
    };

    const delblog = async (id) => {
        console.log(id);
        await dispatch(deleteblog(id));
        await dispatch(getblog());
      };
    
      const confirmDelete = (id) => {
        confirmAlert({
          title: "Delete blog",
          message: "Are you sure you want to delete this blog.",
          buttons: [
            {
              label: "Delete",
              onClick: () => delblog(id),
            },
            {
              label: "Cancel",
              // onClick: () => alert('Click No')
            },
          ],
        });
      };
    


    //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredblog.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredblog.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredblog]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredblog.length;
    setItemOffset(newOffset);
  };
  //   End Pagination


    useEffect(() => {
        dispatch(FILTER_BLOG({ blog, search }));
      }, [blog, search, dispatch]);
    


    return (
        <div className="blog-list">
          <hr />
          <div className="table">
            <div className="--flex-between --flex-dir-column">
              <span>
                <h3>blogs</h3>
              </span>
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>
    
            {isLoading && <SpinnerImg />}
    
            <div className="table">
              {!isLoading && blog.length === 0 ? (
                <p>-- No blog found, please add a blog...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Name</th>
                
                      <th>title</th>
                      <th>description</th>
                      <th>Value</th>
                      <th>Action</th>
                    </tr>
                  </thead>
    
                  <tbody>
                    {currentItems.map((blog, index) => {
                      const { _id, name, title, description,  } = blog;
                      return (
                        <tr key={_id}>
                          <td>{index + 1}</td>
                          <td>{shortenText(name, 16)}</td>
                          <td>{title}</td>
                          <td>
                           
                            {description}
                          </td>
                         
                          <td className="icons">
                            <span>
                              <Link to={`/blog-detail/${_id}`}>
                                <AiOutlineEye size={25} color={"purple"} />
                              </Link>
                            </span>
                            <span>
                              <Link to={`/edit-blog/${_id}`}>
                                <FaEdit size={20} color={"green"} />
                              </Link>
                            </span>
                            <span>
                              <FaTrashAlt
                                size={20}
                                color={"red"}
                                onClick={() => confirmDelete(_id)}
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
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
        </div>
      );
    };
    
export default blogList;