import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/features/auth/authSlice';
import { getUser } from '../../services/authService';
import Button from 'react-bootstrap/Button';

const ViewOrders = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const userEmail = useSelector(selectEmail);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const userData = await getUser();
        const response = await fetch(`http://localhost:5000/api/checkouts`);
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

  const handleApprove = async (checkoutId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkouts/${checkoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Status: 'approved' }), 
      });
      
      if (response.ok) {
        const updatedCheckout = await response.json();
        const updatedCheckouts = checkouts.map((checkout) =>
          checkout._id === updatedCheckout._id ? updatedCheckout : checkout
        );
        setCheckouts(updatedCheckouts);
      } else {
        setError('Failed to update checkout status');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while updating checkout status');
    }
  };

  const handleReject = async (checkoutId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkouts/${checkoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Status: 'rejected' }), 
      });
      
      if (response.ok) {
        const updatedCheckout = await response.json();
        const updatedCheckouts = checkouts.map((checkout) =>
          checkout._id === updatedCheckout._id ? updatedCheckout : checkout
        );
        setCheckouts(updatedCheckouts);
      } else {
        setError('Failed to update checkout status');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while updating checkout status');
    }
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCheckouts = checkouts.filter(checkout => {
    if (!searchQuery) return true;
    return checkout.Status.toLowerCase().includes(searchQuery);
  });

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
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search by status (e.g., pending, approved)"
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            width: '300px'
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
                <Button variant="success" onClick={() => handleApprove(checkout._id)}>
                  Approve
                </Button>{' '}
                <Button variant="danger" onClick={() => handleReject(checkout._id)}>
                  Reject
                </Button>
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
