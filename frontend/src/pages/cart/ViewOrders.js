import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/features/auth/authSlice';
import { getUser } from '../../services/authService';

const ViewOrders = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
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

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  const filteredCheckouts = checkouts.filter(checkout => {
    // Filter by price range
    if (!selectedPriceRange) return true;
    if (selectedPriceRange === 'more-than-5000') {
      return checkout.totalPrice > 5000;
    } else {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      return checkout.totalPrice >= min && checkout.totalPrice <= max;
    }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const priceRanges = [
    { label: 'All', value: '' },
    { label: '0 - 1000', value: '0-1000' },
    { label: '1000 - 2000', value: '1000-2000' },
    { label: '2000 - 3000', value: '2000-3000' },
    { label: '3000 - 4000', value: '3000-4000' },
    { label: '4000 - 5000', value: '4000-5000' },
    { label: 'More than 5000', value: 'more-than-5000' }
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Checkouts</h2>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <select
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        >
          {priceRanges.map((range, index) => (
            <option key={index} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>
      {filteredCheckouts.length === 0 ? (
        <p>No checkouts found</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredCheckouts.map((checkout) => (
            <div key={checkout._id} className="card" style={{ marginBottom: '20px', padding: '20px', width: '300px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '5px' }}>
              <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>Order Details</h3>
              <p><strong>Name:</strong> {checkout.Name}</p>
              <p><strong>Email:</strong> {checkout.email}</p>
              <p><strong>Address:</strong> {checkout.Address}</p>
              <p><strong>Phone Number:</strong> {checkout.PNumber}</p>
              <p><strong>Total Price:</strong> {checkout.totalPrice}</p>
              <p><strong>Status:</strong> 
                <span style={{ color: getStatusColor(checkout.Status) }}>
                  {checkout.Status}
                </span>
              </p>
            </div>
          ))}
        </div>
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
