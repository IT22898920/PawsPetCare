import React from "react";
import "./EventInfoBox.scss";

const EventInfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`event-info-box ${bgColor}`} >
      <span className="event-info-icon --color-white">{icon}</span>
      <span className="event-info-text">
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};

export default EventInfoBox;
