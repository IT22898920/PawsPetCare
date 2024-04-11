import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectName } from "../../redux/features/auth/authSlice";
import "./ViewOrders.css";
import { getUser } from "../../services/authService";

const ViewOrders = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = useSelector(selectEmail);

  useEffect(() => {
    const fetchCheckouts = async () => {
      const data = await getUser();
      console.log(data.email);
      try {
        // Fetch checkouts data from the server
        const response = await fetch(`http://localhost:5000/api/products/checkouts/${data.email}`);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Checkouts</h2>
      {checkouts.length === 0 ? (
        <p>No checkouts found</p>
      ) : (
        <ul>
          {checkouts.map((checkout) => (
            <div className='card' key={checkout._id}> {/* Use unique identifier here */}
              <li>
                <p>Name: {checkout.Name}</p>
                <p>Email: {checkout.email}</p>
                <p>Address: {checkout.Address}</p>
                <p>Phone Number: {checkout.PNumber}</p>
                <p>Total Price: {checkout.totalPrice}</p>
                {/* Add additional checkout details as needed */}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewOrders;
