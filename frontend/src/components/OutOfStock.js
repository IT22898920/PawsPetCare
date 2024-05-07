import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReorderModal from './ReorderModal';
import { toast } from 'react-toastify';
import './OutOfStock.scss';

const OutOfStock = () => {
    const [outOfStockProducts, setOutOfStockProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProductId, setCurrentProductId] = useState('');
    const [isReordering, setIsReordering] = useState(false);
    const [reorderedProducts, setReorderedProducts] = useState([]);

    useEffect(() => {
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

    const reorderProducts = (productId) => {
        setCurrentProductId(productId);
        setIsModalOpen(true);
    };
  
    const handleReorderConfirm = async (quantity) => {
        setIsModalOpen(false);
        setIsReordering(true); 
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/adminreorder`, {
                productId: currentProductId,
                quantity,
                updateQuantity: false

            });
            toast.success("Send Email successfully");
            setReorderedProducts(prev => [...prev, currentProductId]);
        } catch (error) {
            toast.error('Error reordering product');
            console.error('Error reordering product:', error);
        } finally {
            setIsReordering(false); 
        }
    };
    

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setReorderedProducts(prev => prev.filter(id => id !== currentProductId));
    };

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
                            <th>Actions</th>
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
        <td>
          {product.quantity < 4  ? (
            <p className="low-stock-message">Low Stock ({product.quantity} left)</p>
          ) : (
            <p className="out-of-stock-message">Out of Stock</p>
          )}
          {reorderedProducts.includes(product._id) ? (
            <p className="pending-message">Reorder Pending...</p>
          ) : (
            <button onClick={() => reorderProducts(product._id)}>Reorder for Client</button>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No low-stock or out-of-stock products found.</td>
    </tr>
  )}
</tbody>

                </table>
            </div>
            <ReorderModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleReorderConfirm}
            />
        </div>
    );
};

export default OutOfStock;