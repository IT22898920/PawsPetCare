import React, { useEffect }  from "react";
import "./EventSummary.scss";
import { FaCalendarAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { CALC_CATEGORY, selectCategory } from "../../../redux/features/event/eventSlice";
import { useDispatch, useSelector} from "react-redux";

//icons
const totalEvents = < FaCalendarAlt size={30} color="#fff"/>;
const categoryIcon = < BiCategory size={40} color="#fff"/>;

const EventSummary = ({events}) => {

    const dispatch = useDispatch();
    const category = useSelector(selectCategory);

    useEffect(() => {
        dispatch(CALC_CATEGORY(events));
    }, [dispatch, events]);

    return <div className="event-summary">
        <h3 className="--mt">Event Status Overview</h3>
        <div className="event-info-summary">

            <InfoBox 
            icon =  {totalEvents} 
            title={"Total Events"} 
            count = {events.length} 
            bgColor = "card1" 
            style={{ color: "#fff" }}/>

            <InfoBox 
            icon =  {categoryIcon} 
            title={"All Categories"} 
            count = {category.length} 
            bgColor = "card4" 
            />
        </div>
    </div>; 
};

export default EventSummary;