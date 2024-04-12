import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function EditDonation() {
  const [userForm, setUserForm] = useState({
   
        first_name: "",
        last_name: "",
        contact_no: "",
        email: "",
        amount: "",
        payment_mode: "",
        address: "",

  });

  let params = useParams();
  let navigate = useNavigate();

  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:4000/donations/update-donation/" + params.id, {
        

     first_name: userForm.first_name,
     last_name: userForm.last_name,
     contact_no: userForm.contact_no,
     email: userForm.email,
     amount: userForm.amount,
     payment_mode: userForm.payment_mode,
     address: userForm.address,

      })
      .then((res) => {
        console.log({ status: res.status });
        navigate("/donation-list");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/donations/get-donation/" + params.id)
      .then((res) => {
        setUserForm({
          

        first_name: res.data.data.first_name,
        last_name: res.data.data.last_name,
        contact_no: res.data.data.contact_no,
        email: res.data.data.email,
        amount: res.data.data.amount,
        payment_mode: res.data.data.payment_mode,
        address: res.data.data.address,

        });
      });
  }, []);

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={onUpdate}>
          
        
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
          </div>




          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDonation;