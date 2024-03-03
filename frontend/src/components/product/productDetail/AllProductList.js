import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";

import "./AllProductList.css";
import image1 from './image/1.jpg';
import image2 from './image/2.jpg';
import image3 from './image/3.jpg';

const AllProductList = () => {
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

  const navigateToProductDetail = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const stockStatus = (quantity) => {
    return quantity > 0 ? "In Stock" : "Out Of Stock";
  };

  const filterResult = (catItem) => {
    if (catItem === 'all') {
      setData(products);
    } else {
      const result = products.filter(curData => curData.category === catItem);
      setData(result);
    }
  };

  return (
    <div className="container">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="image-container">
          <div className="carousel-inner">
            <div className="carousel-item active">
            <img className="d-block w-100" src={image1} alt="First slide"  />
            </div>
            <div className="carousel-item">
            <img className="d-block w-100" src={image2} alt="Second slide" />
            </div>
            <div className="carousel-item">
            <img className="d-block w-100" src={image3} alt="Third slide" />
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</a>
<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</a>

      </div>

      
      <div className="row">
        <div className="col-md-3">
          <h3 className="mb-4" style={{color:"#5a189a"}}>Categories</h3>
          <div className="btn-group-vertical w-100 mb-3">
            <button className="btn btn-warning" onClick={() => filterResult('all')}>All</button>
            <button className="btn btn-warning" onClick={() => filterResult('nun')}>nun</button>
            <button className="btn btn-warning" onClick={() => filterResult('dd')}>dd</button>
            <button className="btn btn-warning" onClick={() => filterResult('ssss')}>ssss</button>
            <button className="btn btn-warning" onClick={() => filterResult('km')}>km</button>
            <button className="btn btn-warning" onClick={() => filterResult('vv')}>vv</button>
            <button className="btn btn-warning" onClick={() => filterResult('home')}>home</button>
            <button className="btn btn-warning" onClick={() => filterResult('Test')}>Test</button>
          </div>
        </div>
        <div className="col-md-9">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error: {message}</p>
          ) : (
            <div className="row">
              {data.map(product => (
                <div className="col-md-4 mb-4" key={product.id} onClick={() => navigateToProductDetail(product.id)} style={{ cursor: "pointer" }}>
                  <div className="card h-100 product-card">
                    <div className="card-header bg-transparent border-0">
                      <img src={product.image ? product.image.filePath : "/default-product-image.jpg"} className="card-img-top" alt={product.name} />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <div className="product-meta">
                        <span className={`badge ${product.quantity > 0 ? "badge-success" : "badge-danger"}`}>{stockStatus(product.quantity)}</span>
                        <span className="product-price">LKR {product.price}</span>
                      </div>
                      <p className="card-text product-description">{product.description ? product.description : "No description available."}</p>
                    </div>
                    <div className="card-footer bg-transparent border-0">
                      <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); navigateToProductDetail(product.id); }}>View Details</button>
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
