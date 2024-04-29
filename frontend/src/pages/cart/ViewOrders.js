import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/features/auth/authSlice';
import { getUser } from '../../services/authService';

const ViewOrders = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceSearch, setPriceSearch] = useState('');
  const userEmail = useSelector(selectEmail);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        // Fetch user data
        const userData = await getUser();
        // Fetch checkouts data from the server based on user email
        const response = await fetch(`http://localhost:5000/api/products/checkouts/${userData.email}`);
        if (response.ok) {
          const data = await response.json();
          setCheckouts(data);
          setLoading(false);
        } else {
          setError('Failed to fetch checkouts');
        }
      } catch (error) {
        console.error('Error:', error.message);
        setError('An error occurred while fetching checkouts');
      }
    };

    fetchCheckouts();
  }, []);

  const filteredCheckouts = checkouts.filter(checkout => {
    // Filter by price if priceSearch is not empty
    if (priceSearch.trim() === '') return true;
    return checkout.totalPrice.toString().includes(priceSearch);
  });

  const handlePriceSearchChange = (e) => {
    setPriceSearch(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Checkouts</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by price"
          value={priceSearch}
          onChange={handlePriceSearchChange}
          style={{
            width: '300px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>
      {filteredCheckouts.length === 0 ? (
        <p>No checkouts found</p>
      ) : (
        <ul>
          {filteredCheckouts.map((checkout) => (
            <div className="card" key={checkout._id}>
              <li>
                <p>Name: {checkout.Name}</p>
                <p>Email: {checkout.email}</p>
                <p>Address: {checkout.Address}</p>
                <p>Phone Number: {checkout.PNumber}</p>
                <p>Total Price: {checkout.totalPrice}</p>
                <p>Status: 
                  <span style={{ color: getStatusColor(checkout.Status) }}>
                    {checkout.Status}
                  </span>
                </p>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'blue';
    case 'approved':
      return 'green';
    case 'rejected':
      return 'red';
    default:
      return 'black'; 
  }
};

export default ViewOrders;
