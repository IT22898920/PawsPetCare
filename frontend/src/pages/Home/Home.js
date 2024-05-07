import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.scss";
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLink';
import AllBlogList from '../../components/blog/blogDetail/AllBlogList';

const HomeNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('token'); // Assuming you store token in localStorage
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <header>
        <Link to="/" className="logo"><i className="fas fa-utensils"></i>PawsPet care</Link>
        <div id="menu-bars" className="fas fa-bars"></div>
        <nav className="navbar">
          <Link to="#popular">popular</Link>
          <Link to="#gallery">gallery</Link>
          <Link to="#review">review</Link>
          <ul className="navbar-links">
            {!isLoggedIn && (
              <ShowOnLogout>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ShowOnLogout>
            )}
            {isLoggedIn && (
              <ShowOnLogin>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ShowOnLogin>
            )}
          </ul>
        </nav>
      </header>

      <section className="home" id="home">
        <div className="content">
          <h3>Make love</h3>
          <p>Food lovers On the other hand, food lovers are people who simply love food. “Food lover” is an all-encompassing term that includes food enthusiasts of all types, no matter what drives their interests.</p>
          <a href="#" className="btn"> order now</a>
        </div>
        <div className="image">
          <img src="https://img.freepik.com/free-vector/adopt-pet-poster-template_23-2148931292.jpg?t=st=1715020934~exp=1715024534~hmac=30ba68387945b811120d88e0725e2c58c7514f243d88a4e8e66cfbb75f11427a&w=360" alt="Burger Image" />
        </div>
      </section>

      <section className="gallery" id="gallery">
        <h1 className="heading">our food <span> gallery </span></h1>

        <div className="box-container">
          <Box imgSrc="https://cdn.pixabay.com/photo/2024/02/05/16/23/labrador-8554882_1280.jpg" title="american prt" description="lorem ipsum dolor sit, amet consectetur adipising elite. deleniti, ipsum" />
          <Box imgSrc="https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg" title="cola pet" description="lorem ipsum dolor sit, amet consectetur adipising elite. deleniti, ipsum" />
          <Box imgSrc="https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg" title="crazy pet" description="lorem ipsum dolor sit, amet consectetur adipising elite. deleniti, ipsum" />
          <Box imgSrc="https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_640.jpg" title="thik pet" description="lorem ipsum dolor sit, amet consectetur adipising elite. deleniti, ipsum" />
          <Box imgSrc="https://cdn.pixabay.com/photo/2023/12/14/07/44/dog-8448345_640.jpg" title="Thai pet" description="lorem ipsum dolor sit, amet consectetur adipising elite. deleniti, ipsum" />
          <Box imgSrc="https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg" title="king pet" description="lorem ipsum dolor sit, amet consectetur adipising elite. deleniti, ipsum" />
        </div>
      </section>
    </>
  );
};

const Box = ({ imgSrc, title, description }) => {
    return (
        <div className="box">
            <img src={imgSrc} alt={title} />
            <div className="content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default HomeNavBar;


