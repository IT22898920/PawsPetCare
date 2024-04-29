import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";

import { selectUser } from "../../../redux/features/auth/authSlice";
import { getUser } from "../../../services/authService";
import Dog from "../../../img/dog.jpg";

import "./AllProductList.css";
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from '../../../components/search/Search';
import { FILTER_PRODUCTS, selectFilteredPoducts } from "../../../redux/features/product/filterSlice";

const AllProductList = () => {
  const user = useSelector(selectUser);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProducts = useSelector(selectFilteredPoducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, isError, message } = useSelector(state => state.product);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search: searchQuery, category }));
  }, [products, searchQuery, category, dispatch]);

  const stockStatus = (quantity) => {
    return quantity > 4 ? "In Stock" : "Out Of Stock";
  };

  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    try {
      const selectItem = products.find(prod => prod._id === selectedProduct._id);
      if (!selectItem || quantity > selectItem.quantity - 2) {
        toast.error("The requested amount is out of stock");
        return;
      }

      const userData = await getUser();
      const response = await fetch("http://localhost:5000/api/products/Cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ItemId: selectItem._id,
          Currentuser: userData.email,
          ItemsN: selectItem.name,
          price: selectItem.price,
          quantity,
          image: selectItem.image,
          Description: selectItem.description,
        }),
      });

      if (response.ok) {
        toast.success("Item added to cart");
        setShowModal(false);
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleCart = (product) => {
    if (user) {
      setSelectedProduct(product);
      setShowModal(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="product-list-container">
      <ToastContainer />
      <div className="flex justify-center mt-8">
        <img src={Dog} alt="Dog" />
      </div>
      <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <div className="all-products-list">
        <div className="all-products-categories">
          <h3 className="all-products-categories-title">Categories</h3>
          <div className="all-products-carousel-indicators">
            <button className="all-products-category-btn" onClick={() => setCategory('all')}>All</button>
            <button className="products-category-btn" onClick={() => setCategory('Cards and Stationery')}>Cards and Stationery</button>
            <button className="products-category-btn" onClick={() => setCategory('PAWS & Garden')}>PAWS & Garden</button>
            <button className="products-category-btn" onClick={() => setCategory('Supplements')}>Supplements</button>
            <button className="products-category-btn" onClick={() => setCategory('Clothing and accessories')}>Clothing and accessories</button>
            <button className="products-category-btn" onClick={() => setCategory('Gifts')}>Gifts</button>
            <button className="products-category-btn" onClick={() => setCategory('Books & DVDs')}>Books & DVDs</button>
          </div>
        </div>
        <div className="all-products-items">
          {isLoading ? (
            <p className="all-products-loading">Loading...</p>
          ) : isError ? (
            <p className="all-products-error">Error: {message}</p>
          ) : (
            <div className="all-products-grid">
              {filteredProducts.map(product => (
                <div className="all-products-item" key={product._id}>
                  <div className="all-products-item-image">
                    <img src={product.image ? product.image.filePath : "/default-product-image.jpg"} alt={product.name} />
                  </div>
                  <div className="all-products-item-info">
                    <h5 className="all-products-item-name">{product.name}</h5>
                    <div className="all-products-item-details">
                      <span className={`badge ${product.quantity > 3 ? "badge-success" : "badge-danger"}`}>{stockStatus(product.quantity)}</span>
                      <span className="all-products-item-price">LKR {product.price}</span>
                    </div>
                    <p className="all-products-item-description" dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product.description || "No description available.")
                    }} />
                  </div>
                  <div className="all-products-item-action">
                    {user ? (
                      <button disabled={product.quantity <= 3} className={`all-products-add-to-cart-btn ${product.quantity <= 3 ? "out-of-stock" : ""}`}
                        onClick={() => handleCart(product)}>
                        {product.quantity > 3 ? "Add to Cart" : "Out of Stock"}
                      </button>
                    ) : (
                      <button className="all-products-add-to-cart-btn" onClick={() => handleCart(product)}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add Quantity</h2>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    </div>
)}

    </div>
  );
};

export default AllProductList;
