import React from "react";
import "./LayoutStyles.css";
import { userMenu } from "./data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============

  // redering menu list
  const SidebarMenu =  user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="text-light">DOCTOR</h6>
              <h6 className="text-light">CHANNELLING</h6>
              <hr />
            </div>
            <div className="menu">
            {SidebarMenu.map((menu) => {
  const isActive = location.pathname === menu.path;
  return (
    <div key={menu.path} className={`menu-item ${isActive && "active"}`}>
      <i className={menu.icon}></i>
      <Link to={menu.path}>{menu.name}</Link>
    </div>
  );
})}


              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          {/* <div className="content">
            <div className="header">
              
              <div className="header-content" style={{ cursor: "pointer" }}>
              <i className="ri-close-fill remix-icons"></i>
                <Badge
                  count={user && user.notifcation.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Layout;
