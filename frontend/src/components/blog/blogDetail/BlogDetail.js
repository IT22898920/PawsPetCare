import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getBlog } from "../../../redux/features/blog/blogSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./BlogDetail.scss";
import DOMPurify from "dompurify";

const BlogDetail = () => { 
    useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { blog, isLoading, isError, message } = useSelector(
    (state) => state.blog
  );


  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getBlog(id));
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
            <hr />

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

export default BlogDetail;