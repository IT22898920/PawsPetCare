import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReorderModal from './ReorderModal';
import { toast } from 'react-toastify';
import './OutOfStock.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addReorderedProduct } from '../redux/features/product/productSlice'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const ClintOutOfStock = () => {
    const [outOfStockProducts, setOutOfStockProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProductId, setCurrentProductId] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Use this to access any needed state, like user info if needed for the API call
    const reorderedProducts = useSelector((state) => state.product.reorderedProducts) || [];

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

    const reorderProduct = (productId) => {
        setCurrentProductId(productId);
        setIsModalOpen(true);
    };
  
    const handleReorderConfirm = async (quantity) => {
        const product = outOfStockProducts.find(product => product._id === currentProductId);
        if (product) {
            dispatch(addReorderedProduct({
                productId: product._id,
                quantity,
                name: product.name,
                sku: product.sku,
                category: product.category,
                price: product.price
            }));
            toast.success("Product reordered successfully");
        }
        setIsModalOpen(false);
        navigate('/dashboard'); // Adjust the navigation as needed
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="out-of-stock-container">
            <h2>Clint Out of Stock Products</h2>
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
                                        {reorderedProducts.includes(product._id) ? (
                                            <p className="pending-message">Reorder Pending...</p>
                                        ) : (
                                            <button onClick={() => reorderProduct(product._id)}>Re-order</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No out-of-stock products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ReorderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleReorderConfirm}
            />
        </div>
    );
};

export default ClintOutOfStock;