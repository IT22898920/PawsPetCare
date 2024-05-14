// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const GHome = () => {
//     const dayName = "Donate Events";
//     const dayPrice = 1000;
//     const [qty, setQty] = useState(1);
//     const [finalAmount, setFinalAmount] = useState(dayPrice);
//     const navigate = useNavigate();

//     const decrement = () => {
//         if (qty > 1) {
//             setQty(qty - 1);
//             setFinalAmount(finalAmount - dayPrice);
//         }
//     };

//     const increment = () => {
//         setQty(qty + 1);
//         setFinalAmount(finalAmount + dayPrice);
//     };

//     const handleCheckout = async () => {
//         try {
//             const response = await axios.post("/create-checkout-session", {
//                 items: [
//                     {
//                         id: 1,
//                         qty: qty,
//                         price: dayPrice,
//                         name: dayName,
//                     },
//                 ],
//             });
//             const sessionId = response.data.sessionId;
//             navigate(`/checkout/${sessionId}`); // Redirect to checkout page with session ID
//         } catch (error) {
//             console.error("Error creating checkout session:", error);
//         }
//     };

//     return (
//         <div className="home-container">
//             <div className="home-content">
//                 <h1>Donate Events</h1>
//                 <p className="price">Price: ${dayPrice}</p>
//                 <div className="quantity-controls">
//                     <button onClick={decrement}>-</button>
//                     <span className="qty">{qty}</span>
//                     <button onClick={increment}>+</button>
//                 </div>
//                 <p className="total-amount">Total Amount: ${finalAmount}</p>
//                 <button onClick={handleCheckout} className="checkout-button">
//                     Checkout
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default GHome;
