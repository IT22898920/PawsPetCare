import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import CreateDonation from "./components/CreateDonation"; //call create donation page
import EditDonation from "./components/EditDonation"; //call edit donation page
import DonationList from "./components/DonationList"; //call donation list page

//This is the first page that displays the website name and menus
function App() {
  return (
    <div className="App">
      <div className="heading">
          
            <h1> Pet Donation Website </h1>
         
          </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
      
        <div className="container">
        <Link to={"/create-donation"} className="nav-link">
                  Create Donation
                </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <Link to={"/donation-list"} className="nav-link">
                  Donation List
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="wrapper">
          <Routes>
            <Route exact path="/create-donation" element={<CreateDonation />} /> 
            <Route exact path="/edit-donation/:id" element={<EditDonation />} />
            <Route exact path="/donation-list" element={<DonationList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
