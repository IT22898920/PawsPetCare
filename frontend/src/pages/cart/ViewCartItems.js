import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectName } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/authService";
import "./checkout.css";
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import petLogo from './petLogo.png';  

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

    const formData = {
      Name: userName,
      email: data.email,
      Address: event.target.address.value,
      PNumber: event.target.phoneNumber.value,
      Currentuser: data.email,
      items: cartItems,
      totalPrice: totalPrice,
      Status: 'pending',
    };

    // Form validation
    if (!validateForm(formData)) return;

    try {
      const checkoutResponse = await fetch('http://localhost:5000/api/products/Checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (checkoutResponse.ok) {
        setShowModal(false);

        const deleteResponse = await fetch(`http://localhost:5000/api/products/deletCurretId/${data.email}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (deleteResponse.ok) {
          console.log('Cart items cleared successfully');
          setCartItems([]);
          // Generate PDF and trigger download
          generatePDF(formData);
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

  const generatePDF = async (formData) => {
    const pdfDoc = new jsPDF();
    
    // Load the image and generate the PDF
    const loadImage = src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };
    
    // Load the logo image
    const logoImg = await loadImage(petLogo);
    
    // Start by adding the logo
    pdfDoc.addImage(logoImg, 'PNG', 150, 10, 40, 40); // Adjust size and position as needed
    
    // Define initial Y position for the text under the logo
    let yPos = 60; // Adjust this value based on the size of your logo
    
    // Pet Care Address
    const petCareAddressLines = [
      "E3, Isurupura",
      "Malabe",
      "Sri Lanka",
    ];
    pdfDoc.setFontSize(10);
    petCareAddressLines.forEach(line => {
      pdfDoc.text(line, 10, yPos);
      yPos += 10; // Increment yPos for each line
    });
    
    // Add a space before adding the title
    yPos += 10;
    
    // Setting the title
    const title = "Invoice Report";
    pdfDoc.setFontSize(14);
    const titleWidth = pdfDoc.getStringUnitWidth(title) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor;
    const titleX = (pdfDoc.internal.pageSize.width - titleWidth) / 2; 
    pdfDoc.text(title, titleX, yPos); 
  
    // Increment yPos before adding customer details
    yPos += 20;
    
    // Customer details
    pdfDoc.setFontSize(12);
    const customerDetails = `Customer Name: ${formData.Name}\nEmail: ${formData.email}\nPhone: ${formData.PNumber}\nAddress: ${formData.Address}`;
    pdfDoc.text(customerDetails, 10, yPos);
    
    // Increment yPos for date and items list
    yPos += 20;
    
    // Add date
    const currentDate = new Date().toLocaleDateString();
    pdfDoc.text(`Date: ${currentDate}`, 10, yPos);
    yPos += 10;
    
    // Items details
    formData.items.forEach((item, index) => {
      const itemDetails = `Item ${index + 1}:\nName: ${item.ItemsN}\nPrice: ${item.price}\nQuantity: ${item.quantity}`;
      pdfDoc.text(itemDetails, 10, yPos);
      yPos += 20; // Adjust space between items as needed
    });
    
    // Total price
    pdfDoc.text(`Total Price: ${formData.totalPrice}`, 10, yPos);
    
    // Manager's signature
    yPos += 20;
    pdfDoc.text("Manager's Signature:", 10, yPos);
    pdfDoc.line(60, yPos, 150, yPos); // Draw a line for the signature
    
    // Add current date and time under the signature
    yPos += 10;
    const currentDateTime = new Date().toLocaleString();  // This includes both date and time
    pdfDoc.text(`Date and Time: ${currentDateTime}`, 10, yPos);
    
    // Save the PDF document
    pdfDoc.save('checkout_details.pdf');
  };
  
  
  
  
  
  

  const validateForm = (formData) => {
    const { Name, email, Address, PNumber } = formData;

    if (!Name.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Name',
        text: 'Name cannot be empty!',
      });
      return false;
    }

    if (!email.trim() || !/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address!',
      });
      return false;
    }

    if (!Address.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Address',
        text: 'Address cannot be empty!',
      });
      return false;
    }

    if (!PNumber.trim() || !/^\d{10}$/.test(PNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number',
        text: 'Phone number must be 10 digits!',
      });
      return false;
    }

    return true;
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);






  return (
    <div className="cart-items-container" style={{padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
      <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Cart Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        cartItems.length > 0 ? (
          <div>
            {cartItems.map(item => (
              <div key={item._id} className='card' style={{marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',width:"38%" }}>
                <div className="cart-item" style={{display: 'flex', alignItems: 'center'}}>
                  <button onClick={() => handleDeleteCartItem(item._id)} style={{marginRight: '10px', padding: '5px 10px', backgroundColor: '#ff6347', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>X</button>
                  <img src={item.image ? item.image.filePath : "/default-product-image.jpg"} className="card-img-top" alt={item.name} style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px'}} />
                  <div style={{marginLeft: '15px'}}>
                    <h3>{item.ItemsN}</h3>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    

                  </div>
                </div>
              </div>
            ))}
            <h1 style={{marginTop: '20px', textAlign: 'right'}}>Total Price: {totalPrice}</h1>
            <button onClick={() => setShowModal(true)} style={{marginTop: '20px', padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer',height:'50px',width:'200px',fontSize:'18px'}}>Checkout</button>
            {showModal && (
              <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="modal-content" style={{backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
                  <span className="close" onClick={() => setShowModal(false)} style={{position: 'absolute', top: '10px', right: '10px', fontSize: '20px', cursor: 'pointer'}}>&times;</span>
                  <h2 style={{textAlign: 'center'}}>Checkout</h2>
                  <form onSubmit={handleCheckout}>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Total</label>
                      <input type="text" defaultValue={totalPrice} readOnly className="form-control" id="exampleInputPassword1" placeholder="Total" style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px'}} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputAddress">Name</label>
                      <input type="text" value={userName} className="form-control" id="name" name="name" placeholder="Enter name" style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px'}} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputAddress">Home Address</label>
                      <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px'}} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPhoneNumber">Phone number</label>
                      <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Enter mobile number" style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px'}} />
                    </div>
                    <p style={{textAlign: 'center'}}>Proceed with checkout?</p>
                    <button type="submit" className="btn btn-primary" style={{display: 'block', width: '100%', padding: '10px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Confirm</button>
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
