import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/features/event/eventSlice";
import EventList from "../../components/event/eventList/EventList";
import EventSummary from "../../components/event/eventSummary/EventSummary";

const EventDashboard = () => {
    const dispatch = useDispatch();
    
    const {events, isLoading, isError, message} = useSelector((state) => state.event);

    useEffect(() => {
       dispatch (getEvents());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
          console.log(message);
        }
      }, [isError, message]);
    //},[isLoggedIn, isError, message, dispatch, events])

    return (
        <div>
            <h2 style={{textAlign: "center"}}>Animal Event Dashboard</h2>
            <EventSummary events = {events}/>
            
            <EventList events = {events} isLoading={isLoading}/>
        </div> 
    );
};

export default EventDashboard;