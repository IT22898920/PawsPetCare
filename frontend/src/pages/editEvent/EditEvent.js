import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, getEvents, selectEvent, selectIsLoading, updateEvent } from "../../redux/features/event/eventSlice";
import Loader from "../../components/loader/Loader";
import EventForm from "../../components/event/eventForm/EventForm";

const EditEvent = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector (selectIsLoading);

    const eventEdit = useSelector (selectEvent)

    const [event, setEvent] = useState (eventEdit);
    const [eventImage, setEventImage] = useState ("");
    const [imagePreview, setImagePreview] = useState (null);
    const [description, setDescription] = useState ("");

    useEffect (() => {
        dispatch(getEvent(id))
    }, [dispatch, id])

    useEffect(() => {
        setEvent(eventEdit)

        setImagePreview(
            eventEdit && eventEdit.image ? `${eventEdit.image.filePath}` : null
        )

        setDescription(
            eventEdit && eventEdit.description ? eventEdit.description : ""
        )

    }, [eventEdit])

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
        formData.append("name", event?.name);
        formData.append("category", event?.category);
        formData.append("date", event?.date);
        formData.append("venue", event?.venue);
        formData.append("time", event?.time);
        formData.append("trainer", event?.trainer);
        formData.append("description", description);
        if (eventImage) {
            formData.append("image", eventImage);
        }
        formData.append("image", eventImage);
    
        console.log (...formData);

        await dispatch(updateEvent({id, formData}));
        await dispatch (getEvents())
        navigate("/event-dashboard");
    
        };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Update Event</h3>
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

export default EditEvent;