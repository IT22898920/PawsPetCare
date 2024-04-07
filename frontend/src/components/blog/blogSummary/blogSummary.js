import React from 'react'
import "./blogSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/blog/blogSlice";
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const blogSummary = ({ blog }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(blog));
    dispatch(CALC_OUTOFSTOCK(blog));
    dispatch(CALC_CATEGORY(blog));
  }, [dispatch, blog]);

  return (
    <div className="blog-summary">
      <h3 className="--mt">blog</h3>
      <div className="info-summary">
        <Row>
          <Col>
          <InfoBox
          icon={productIcon}
          title={"Total blog"}
          count={blog.length}
          bgColor="card1"
        />
          </Col>

          <Col>
          <Link to="/total">
          <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`LKR ${formatNumbers(totalStoreValue.toFixed(2))}  `}
          bgColor="card2"
        /></Link>
          </Col>
          
          <Col>
          <Link to="/out">
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        /> </Link>
          </Col>

          <Col>
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
          </Col>
        </Row>
    
      </div>
    </div>
  );
};

export default blogSummary
