import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DonationList() {
  const [userForm, setUserForm] = useState([]);

  const deleteDonation = (_id) => {
    axios
      .delete("http://localhost:4000/donations/delete-donation/" + _id)
      .then(() => {
        console.log("Data successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/donations/")
      .then((res) => {
        setUserForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userForm]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            
            
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Contact No</th>
            <th scope="col">Email</th>
            <th scope="col">Amount</th>
            <th scope="col">Payment Mode</th>
            <th scope="col">Address</th>




            <th scope="col">Action</th>  
          </tr>
        </thead>
        <tbody>
          {userForm.map((user, index) => {
            return (
              <tr key={index}>
                
                
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.contact_no}</td>
                <td>{user.email}</td>
                <td>{user.amount}</td>
                <td>{user.payment_mode}</td>
                <td>{user.address}</td>


                <td>
                  <Link
                    className="btn btn-primary btn-sm me-2"
                    to={"/edit-donation/" + user._id}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteDonation(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DonationList;
