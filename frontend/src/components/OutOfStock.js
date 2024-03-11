import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OutOfStock.scss';

const OutOfStock = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/outofstock`)
      .then(response => {
        setOutOfStockProducts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching out of stock products:', error);
        setError(error.response?.data?.message || 'Something went wrong');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="out-of-stock-container">
      <h2>Out of Stock Products</h2>
        <div className="out-of-stock-table">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {outOfStockProducts.length > 0 ? (
                    outOfStockProducts.map(product => (
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.sku}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="4">No out-of-stock products found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default OutOfStock;
