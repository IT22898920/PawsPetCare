import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateDonation() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userForm, setUserForm] = useState({
    
 
    //Field names in the pet donation form

first_name: "",
last_name: "",
contact_no: "",
email: "",
amount: "",
payment_mode: "",
address: "",


  });

  const inputsHandler = (e) => {
    const { name, value } = e.target;

    setUserForm({
      ...userForm,
      [name]: value
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    if (!userForm.first_name) {
      newErrors.first_name = "First name is required";
      isValid = false;
    }


    if (!userForm.name) {
      newErrors.last_name = "Last name is required";
      isValid = false;
    }


    if (!userForm.contact_no) {
      newErrors.contact_no = "Contact no is required";
      isValid = false;
    }


    if (!userForm.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }


    if (!userForm.amount) {
      newErrors.amount = "Amount is required";
      isValid = false;
    }


    if (!userForm.payment_mode) {
      newErrors.payment_mode = "Payment mode is required";
      isValid = false;
    }

    if (!userForm.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

       setErrors(newErrors);
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/donations/create-donation", userForm)
      .then((res) => {
        console.log(res.data);
        setUserForm({
         

        first_name: "",
        last_name: "",
        contact_no: "",
        email: "",
        amount: "",
        payment_mode: "",
        address: "",

        });
      });

      if (validateForm()) {
        // Form is valid, you can submit or process the data here
  
       
  
        console.log("Form data:", userForm);
        setSubmitted(true); // Set a submitted flag
      } else {
        // Form is not valid, display error messages
      }
  };

  useEffect(() => {}, []);

  //const isFormValid = Object.keys(errors).length === 0;
  return (
    <div>
      <div className="form-wrapper">
     
      <h2>Donation Form</h2>
      {submitted ? (
        <div className="success-message">Transaction successful!</div>
      ) : (
        <form onSubmit={onSubmit}>
          
          

          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              id="first_name"
              value={userForm.first_name}
              onChange={inputsHandler}
            />

          {errors.first_name && <div className="error">{errors.first_name}</div>}
          
          </div>


          <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              id="last_name"
              value={userForm.last_name}
              onChange={inputsHandler}
            />

           {errors.last_name && <div className="error">{errors.last_name}</div>}
          </div>


          <div className="mb-3">
            <label className="form-label">Contact No:</label>
            <input
              type="text"
              className="form-control"
              name="contact_no"
              id="contact_no"
              value={userForm.contact_no}
              onChange={inputsHandler}
            />

              {errors.contact_no && <div className="error">{errors.contact_no}</div>}
          </div>


          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={userForm.email}
              onChange={inputsHandler}
            />

             {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Amount:</label>
            <input
              type="text"
              className="form-control"
              name="amount"
              id="amount"
              value={userForm.amount}
              onChange={inputsHandler}
            />

           {errors.amount && <div className="error">{errors.amount}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Payment Mode:</label>
            <input
              type="text"
              className="form-control"
              name="payment_mode"
              id="payment_mode"
              value={userForm.payment_mode}
              onChange={inputsHandler}
            />

          {errors.payment_mode && <div className="error">{errors.payment_mode}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              name="address"
              id="address"
              value={userForm.address}
              onChange={inputsHandler}
            />

           {errors.address && <div className="error">{errors.address}</div>}
          </div>
          
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
       )}
      </div>
    </div>
  );
}

export default CreateDonation;
