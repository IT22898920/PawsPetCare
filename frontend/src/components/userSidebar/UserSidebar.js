import React, { useState } from "react";
import "./UserSidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";
import menu from "./UserBarComponents";
import SidebarItem from "./UserSidebarItem";
import { BiImageAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth); 
console.log(user.name)
    const goHome = () => {
        navigate("/");
    };

    return (
        <div className="layout">
            <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
                <div className="top_section">
                    <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
                        <RiProductHuntLine
                            size={35}
                            style={{ cursor: "pointer" }}
                            onClick={goHome}
                        />
                    </div>

                    <div
                        className="bars"
                        style={{ marginLeft: isOpen ? "100px" : "0px" }}
                    >
                        <HiMenuAlt3 onClick={toggle} />
                    </div>
                </div>
                {menu.map((item, index) => {
                    return <SidebarItem key={index} item={item} isOpen={isOpen} />;
                })}
                {/* Additional items for doctors */}
                {user.role === 'doctor' && (
                    <>
                        <SidebarItem item={{ title: "Doctor Appointments", icon: <BiImageAdd />, path: "/doctorAppointments" }} isOpen={isOpen} />
                        
                    </>
                )}
            </div>

            <main
                style={{
                    paddingLeft: isOpen ? "230px" : "60px",
                    transition: "all .5s",
                }}
            >
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
