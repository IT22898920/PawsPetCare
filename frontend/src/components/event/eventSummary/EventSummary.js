import React, { useEffect }  from "react";
import "./EventSummary.scss";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";
import InfoBox from "../../infoBox/InfoBox";

//icons
const totalEvents = < FaCalendarAlt size={30} color="#fff"/>;
const upcomingEvents = < FaCalendarPlus size={40} color="#fff"/>;
const deletedEvents = < FaTrashAlt size={40} color="#fff"/>;
const categoryIcon = < BsCartX size={40} color="#fff"/>;

const EventSummary = ({events}) => {
    return <div className="event-summary">
        <h3 className="--mt">Event Status Overview</h3>
        <div className="event-info-summary">
            <InfoBox 
            icon =  {totalEvents} 
            title={"Total Events"} 
            count = {events.length} 
            bgColor = "card1" 
            style={{ color: "#fff" }}/>
        </div>
    </div>; 
};

export default EventSummary;