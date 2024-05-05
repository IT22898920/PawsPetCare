import React, { useEffect } from "react";
import "./EventDetail.scss";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getEvent } from "../../../redux/features/event/eventSlice";
import { Card } from "antd";
import { SpinnerImg } from "../../loader/Loader";
import DOMPurify from "dompurify";

const EventDetail = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();

    const {id} = useParams();

    const isLoggedIn = useSelector(selectIsLoggedIn);
  const { event, isLoading, isError, message } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getEvent(id));
      
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

    return (
        <div className="event-detail">
            <h3 className="--mt">Event Details</h3>
            <Card cardClass="card">
              {isLoading && <SpinnerImg/>}
              {event && (
                <div className="detail">
                  <Card cardClass="group">
                      {event?.image ? (
                         <img src={event.image.filePath} alt={event.image.fileName}/>
                    ) : (
                      <p>No any image set for this event</p>
                    )}  
                    <hr/>
                    <h4>
                      <span className="badge">Event Name: </span> &nbsp; {event.name}
                    </h4>
                    <p>
                      <b>&rarr; Event Code : </b> {event._id}
                    </p>
                    <p>
                      <b>&rarr; Event Category : </b> {event.category}
                    </p>
                    <p>
                      <b>&rarr; Event Date : </b> {event.date}
                    </p>
                    <p>
                      <b>&rarr; Event Venue : </b> {event.venue}
                    </p>
                    <p>
                      <b>&rarr; Event Time : </b> {event.time}
                    </p>
                    <p>
                      <b>&rarr; Event Trainer : </b> {event.trainer}
                    </p>
                    <hr/>                   
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize (event.description) }} />  
                    <hr />
            <code className="--color-dark">
              Created on: {event.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {event.updatedAt.toLocaleString("en-US")}
            </code>
                    
                  </Card>
                </div>
              )}
            </Card>           
        </div>
    );
};

export default EventDetail;