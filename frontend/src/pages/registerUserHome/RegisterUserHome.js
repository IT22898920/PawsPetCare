import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
import "../Home/Home.scss";
import { ShowOnLogin,  } from '../../components/protect/HiddenLink';


const RegisterUserHome = () => {

    const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/");
  };

  return (
    <>
      <header>
        <Link to="/registeruserHome" className="logo"><i className="fas fa-utensils"></i>PawsPet care</Link>
        <div id="menu-bars" className="fas fa-bars"></div>
        <nav className="navbar">
          <Link to="#home">home</Link>
          <Link to="/AllProductList">Shop</Link>
          <Link to="/AllPetList">Adopt Pet</Link>
          <Link to="/AllBlogList">Blog</Link>
          <ul className="navbar-links">
          <button onClick={logout} className="--btn --btn-danger">
          Logout
        </button>
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
          <p>A pet lover is someone who adores animals, treating them like family and prioritizing their well-being and happiness. They enjoy spending quality time with their pets and are dedicated to providing them with love, care, and attention</p>
          <a href="https://www.bing.com/ck/a?!&&p=ee8a9538cb05a392JmltdHM9MTcxNDk1MzYwMCZpZ3VpZD0zYjEzNWYwOC03OTI2LTY2NWQtMzc0Mi00Y2QwNzgyNzY3M2YmaW5zaWQ9NTIyMA&ptn=3&ver=2&hsh=3&fclid=3b135f08-7926-665d-3742-4cd07827673f&psq=wikipidia+pet+adoption&u=a1aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUGV0X2Fkb3B0aW9u&ntb=1" className="btn">lern more</a>
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

export default RegisterUserHome;
