import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";

import { selectEmail, selectName, selectUser, SET_LOGIN } from "../../../redux/features/auth/authSlice";

import { getUser } from "../../../services/authService";
import Dog from "../../../img/dog.jpg";


import "./AllProductList.css";
import DOMPurify from 'dompurify'; // Make sure to install DOMPurify using npm or yarn
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AllProductList = () => {

  const { user } = useSelector((state) => state.auth);
  const email = useSelector(selectEmail);
  // console.log("Logged in user's email:", user.email); // Console log the logged-in user's email
  const name = useSelector(selectName);

  const [showMore, setShowMore] = useState(false);
  const [notification, setNotification] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, isError, message } = useSelector(state => state.product);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setData(products);
    }
  }, [products]);


  const stockStatus = (quantity) => {
    return quantity > 4 ? "In Stock" : "Out Of Stock";
  };

  const filterResult = (catItem) => {
    if (catItem === 'all') {
      setData(products);
    } else {
      const result = products.filter(curData => curData.category === catItem);
      setData(result);
    }
  };

  const handleAddToCart = async (productID) => {
    try {
      const selectItem = products.find(products => products._id === productID);
      if (!selectItem) {
        throw new Error("Item not found");
      }
      const data = await getUser();
      const response = await fetch("http://localhost:5000/api/products/Cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ItemId: selectItem._id,
          Currentuser: data.email,
          ItemsN: selectItem.name,
          price: selectItem.price,
          quantity: 1,
          image: selectItem.image,
          Description: selectItem.description, // Make sure this matches your backend model
        }),
      });
  
      if (!response.ok) {
        toast.error("Out of stock");
      } else {
        toast.success("Item added to cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item to cart");
    }
  };
  


  const handleCart = () => {
    if (user) {
      handleAddToCart();
    } else {
      window.scrollTo(0, 0);
      navigate('/login');
    }
  };

  const PopupNotification = ({ notification }) => {
    return (
      <div className="all-products-popup">
        <div className="all-products-popup-content">
          <h1 className="all-products-popup-message">{notification}</h1>
        </div>
      </div>
    );
  };

  return (
    
    <div className="product-list-container">
      <div className="flex justify-center mt-8">
        <img src={Dog} alt="Dog" />
      </div>

      <div className="all-products-list">
        <div className="all-products-categories">
        <h3 className="all-products-categories-title">Categories</h3>
        <div className="all-products-carousel-indicators">
            <button className="all-products-category-btn" onClick={() => filterResult('all')}>All</button>
            <button className="products-category-btn" onClick={() => filterResult('Cards and Stationery')}>Cards and Stationery</button>
            <button className="products-category-btn" onClick={() => filterResult('PAWS & Garden')}>PAWS & Garden</button>
            <button className="products-category-btn" onClick={() => filterResult('Supplements')}>Supplements</button>
            <button className="products-category-btn" onClick={() => filterResult('Clothing and accessories')}>Clothing and accessories	</button>
            <button className="products-category-btn" onClick={() => filterResult('Gifts')}>Gifts</button>
            <button className="products-category-btn" onClick={() => filterResult('Books & DVDs')}>Books & DVDs	</button>
          </div>
        </div>
        <div className="all-products-items">
        {notification && <PopupNotification notification={notification} />}
          {isLoading ? (
            <p className="all-products-loading">Loading...</p>
            ) : isError ? (
              <p className="all-products-error">Error: {message}</p>
              ) : (
                <div className="all-products-grid">
                  {data.map(product => (
                    <div className="all-products-item" key={product._id} style={{ cursor: "pointer" }}>
                  <div className="">
                    <div className="all-products-item-image">
                      <img src={product.image ? product.image.filePath : "/default-product-image.jpg"} className="" alt={product.name} />
                    </div>
                    <div className="all-products-item-info">
                      <h5 className="all-products-item-name">{product.name}</h5>
                      <div className="all-products-item-details">
                        <span className={`badge ${product.quantity > 3 ? "badge-success" : "badge-danger"}`}>{stockStatus(product.quantity)}</span>
                        <span className="all-products-item-price">LKR {product.price}</span>
                      </div>
                      <p 
                        className="all-products-item-description"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(product.description || "No description available.")
                        }} 
                      />                  
                    </div>
                    <div className="all-products-item-action">
                      {user ? (
                        <button 
                        disabled={product.quantity <= 3}
                        className="all-products-add-to-cart-btn" 
                        onClick={() => handleAddToCart(product._id)}
                      >
                        {product.quantity > 3 ? "Add to Cart" : "Out of Stock"}
                      </button>
                      ) : (
                        <button className="all-products-add-to-cart-btn" onClick={handleCart} >
                          Add to Cart
                        </button>
                      )}
                      
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductList;
