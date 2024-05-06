import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AllEventList.scss'
import { getEvents } from '../../../redux/features/event/eventSlice';



const AllEventList = () => {
    const dispatch = useDispatch();
    const { events, isLoading, isError, message } = useSelector(state => state.event);
    console.log('Events from state:', events); 
    
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);
    
    useEffect(() => {
        console.log(events); 
    }, [events]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!events.length) {
        return <p>No events found!</p>;
    }

    return (
        <div className="event-grid">
            {events.map(event => (
                <div key={event.id} className="event-card">
                    <h4>{event.name}</h4>
                    
                    <img src={event.image?.filePath} alt={event.name} />
                    <h5>Category: {event.category}</h5>
                    <h5>Date: {event.Date}</h5>
                    <h5>Venue: {event.venue}</h5>
                    <h5>Time: {event.time}</h5>
                    <h5>Trainer: {event.trainer}</h5>
                    <h5><p>{event.description}</p></h5>
                    
                </div>
            ))}
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default AllEventList;
