import React, { useEffect } from "react";
import "./EventDetail.scss";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getEvent } from "../../../redux/features/event/eventSlice";
import { Card } from "antd";

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
      dispatch(getEvent());
      console.log(event);
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, event]);

    return (
        <div className="event-detail">
            <h3 className="--mt">Event Details</h3>
            <Card cardClass="card">

            </Card>           
        </div>
    );
};

export default EventDetail;