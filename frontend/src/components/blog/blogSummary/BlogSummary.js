import React from 'react';
import "./BlogSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const blogSummary = ({ blog }) => {
  const totalStoreValue = 0; // Assuming a placeholder value, adjust accordingly.

  // If blog is undefined or not an array, render nothing or a placeholder
  if (!Array.isArray(blog)) {
    return <div>Loading blogs...</div>; // or any other placeholder content
  }

  return (
    <div className="blog-summary">
      <h3 className="--mt">Blog Summary</h3>
      <div className="info-summary">
        <Row>
          <Col>
            <InfoBox
              icon={<AiFillDollarCircle size={40} color="#fff" />}
              title={"Total Blog"}
              count={blog.length}
              bgColor="card1"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default blogSummary;
