import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name}</span>
        </h3>
        <button 
          onClick={() => navigate('/AllProductList')} 
          style={{
            backgroundColor: '#b624ff', // Updated background color
            color: 'white', // Text color
            padding: '10px 20px', // Padding: 10px top and bottom, 20px left and right
            border: 'none', // No border
            borderRadius: '5px', // Rounded corners
            cursor: 'pointer', // Pointer cursor on hover
            // Add any additional styles here
          }}
          className="--btn --btn-AllProductList">
          AllProductList
        </button>

        <button onClick={logout} className="--btn --btn-danger">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
