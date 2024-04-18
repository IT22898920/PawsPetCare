import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectName } from "../../redux/features/auth/authSlice";

import { getUser } from "../../services/authService";

import "./checkout.css"
import { jsPDF } from "jspdf";
import "./ViewCartItems.css";

const ViewCartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const userEmail = useSelector(selectEmail);
  const userName = useSelector(selectName);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      const userdata = await getUser();
      console.log(userdata.email);
      try {
        const response = await fetch(`http://localhost:5000/api/products/cartitem/${userdata.email}`);
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchCartItems();
  }, [userEmail]);

  const handleDeleteCartItem = async (itemId) => {
    const confirmation = window.confirm("Are you sure you want to delete this item?");
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/deleteitems/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCartItems(cartItems.filter(item => item._id !== itemId));
      } else {
        console.error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
  
    const data = await getUser();
    console.log(data.email);
  
    const formData = {
      Name: userName,
      email: data.email,
      Address: event.target.address.value,
      PNumber: event.target.phoneNumber.value,
      Currentuser: data.email, 
      items: cartItems,
      totalPrice: totalPrice
    };
  
    try {
      const checkoutResponse = await fetch('http://localhost:5000/api/products/Checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (checkoutResponse.ok) {
        setShowModal(false); // Hide the modal after successful checkout
  
        // PDF Generation
        const pdf = new jsPDF();
  
        pdf.text("Checkout Summary", 20, 20);
        pdf.text(`Name: ${formData.Name}`, 20, 30);
        pdf.text(`Email: ${formData.email}`, 20, 40);
        pdf.text(`Address: ${formData.Address}`, 20, 50);
        pdf.text(`Phone Number: ${formData.PNumber}`, 20, 60);
        pdf.text(`Total Price: $${formData.totalPrice}`, 20, 70);
  
        // Adding cart items
        let y = 80;
        formData.items.forEach(item => {
          pdf.text(`${item.name} - Quantity: ${item.quantity} - Price: $${item.price}`, 20, y);
          y += 10;
        });
  
        pdf.save("checkout-summary.pdf");
  
        // Clear cart items in the client-side state and server
        const deleteResponse = await fetch(`http://localhost:5000/api/products/deletCurretId/${data.email}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application.json'
          }
        });
  
        if (deleteResponse.ok) {
          console.log('Cart items cleared successfully');
          setCartItems([]);
        } else {
          console.error('Failed to clear cart items');
        }
      } else {
        console.error('Failed to checkout');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  
  
  

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
  <div className="cart-items-container">
    <h2>Cart Items</h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      cartItems.length > 0 ? (
        <div>
          {cartItems.map(item => (
            // The key should be here on the outermost div of the map
            <div key={item._id} className='card'>
              <div className="cart-item">
                <button onClick={() => handleDeleteCartItem(item._id)}>X</button>
                <img src={item.image ? item.image.filePath : "/default-product-image.jpg"} className="card-img-top" alt={item.name} />
                  <h3>{item.ItemsN}</h3>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          <h1>Total Price: {totalPrice}</h1>
          <button onClick={() => setShowModal(true)}>Checkout</button>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                  <h2>Checkout</h2>
        
                  <form onSubmit={handleCheckout}>
                    
  {/* <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" value={data.email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div> */}
<div className="form-group">
  <label htmlFor="exampleInputPassword1">Total</label>
  <input type="text" defaultValue={totalPrice} readOnly className="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>

  <div class="form-group">
    <label for="exampleInputAddress">Name</label>
    <input type="address" value={userName} class="form-control" id="name" name="name" placeholder="enter name"/>
  </div>
  <div class="form-group">
    <label for="exampleInputAddress">Home Address</label>
    <input type="address"  class="form-control" id="address" name="address" placeholder="enter address"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPhoneNumber">Phone number</label>
    <input type="number"  class="form-control" id="phoneNumber" name="phoneNumber" placeholder="enter mobile number"/>
  </div>

  <p>Proceed with checkout?</p>
  <button type="submit" class="btn btn-primary">Confirm</button>
</form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No items in the cart</p>
        )
      )}
    </div>
  );
};

export default ViewCartItems;
