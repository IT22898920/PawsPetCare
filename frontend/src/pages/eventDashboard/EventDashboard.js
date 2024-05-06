import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/features/event/eventSlice";
import EventList from "../../components/event/eventList/EventList";
import EventSummary from "../../components/event/eventSummary/EventSummary";

const EventDashboard = () => {
    const dispatch = useDispatch();
    
    const {events, isLoading, isError, message} = useSelector((state) => state.event);

    const [reportType, setReportType] = useState("csv"); // State for report type selection

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
            
             {/* Report Generation Dropdown */}
      {/* <div className="report-options">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          style={{
            margin: "10px 0",
            padding: "5px",
          }}
        >
          <option value="csv">CSV</option>
          <option value="pdf">PDF</option>
        </select> */}
        {/* Generate Report Button */}
        {/* <button onClick={handleGenerateReport}>Generate Report</button> */}
      {/* </div> */}
            
            <EventSummary events = {events}/>
            
            <EventList events = {events} isLoading={isLoading}/>
        </div> 
    );
};

export default EventDashboard;