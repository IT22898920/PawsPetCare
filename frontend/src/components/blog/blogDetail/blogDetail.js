import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getblog } from "../../../redux/features/blog/blogSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./blogDetail.scss";
import DOMPurify from "dompurify";

const blogDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { blog, isLoading, isError, message } = useSelector(
    (state) => state.blog
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getblog(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="blog-detail">
      <h3 className="--mt">blog Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {blog && (
          <div className="detail">
            <Card cardClass="group">
              {blog?.image ? (
                <img
                  src={blog.image.filePath}
                  alt={blog.image.fileName}
                />
              ) : (
                <p>No image set for this blog</p>
              )}
            </Card>
            <h4>blog Availability: {stockStatus(blog.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {blog.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {blog.sku}
            </p>
            <p>
              <b>&rarr; title : </b> {blog.title}
            </p>
           
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {blog.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {blog.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default blogDetail;
