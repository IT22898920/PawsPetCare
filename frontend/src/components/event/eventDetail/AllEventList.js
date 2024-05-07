import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AllEventList.scss'
import { getEvents } from '../../../redux/features/event/eventSlice';
import DOMPurify from 'dompurify';

const AllEventList = () => {

    const [selectedEvent, setSelectedEvent] = useState(null);

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

    const openPopup = (event) => {
        setSelectedEvent(event);
    };

    const closePopup = () => {
        setSelectedEvent(null);
    };

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
                    
                   <div className='event-category'>
                    <button>  {event.category} </button>
                    </div>
                    
                    <p> {event.date}</p>
                   
                    <div className="event-details">
                    <p> {event.venue}</p>
                    </div>
                    <div className="event-details">
                    <p>From :  {event.time} Onwards..</p>
                    </div>
                    <div className="event-details">
                    <p>Trainer : {event.trainer}</p>
                    </div>
                    <div className="event-description">
                                    <hr/> <br></br>
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize (event.description) }} /> 
                </div>
                
        </div>
                
            ))}
            <ToastContainer position="bottom-right" />
        </div>
        
    );
};

export default AllEventList;