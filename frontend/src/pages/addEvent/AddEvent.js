import React, { useState } from "react";
import EventForm from "../../components/event/eventForm/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, selectIsLoading } from "../../redux/features/event/eventSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: "",
    category: "",
    date: "",
    venue: "",
    time: "",
    trainer: "",
}

const AddEvent = () => {
    const [event, setEvent] = useState (initialState)
    const [eventImage, setEventImage] = useState ("")
    const [imagePreview, setImagePreview] = useState (null)
    const [description, setDescription] = useState ("")
   
    const isLoading = useSelector (selectIsLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {name, category, date, venue, time, trainer} = event;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
      };

      const handleImageChange = (e) => {
        setEventImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      };
const saveEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("venue", venue);
    formData.append("time", time);
    formData.append("trainer", trainer);
    formData.append("description", description);
    formData.append("image", eventImage);

    console.log (...formData);

    await dispatch(createEvent(formData));

    navigate("/event-dashboard");

    };


    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Add New Event</h3>
            <EventForm
            event = {event}
            eventImage = {eventImage}
            imagePreview = {imagePreview}
            description = {description}
            setDescription = {setDescription}
            handleInputChange = {handleInputChange}
            handleImageChange = {handleImageChange}
            saveEvent = {saveEvent}
            />
        </div>
    );
};
export default AddEvent;