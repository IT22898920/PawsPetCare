import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/events/`;

//Create New Event 
const createEvent = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

//Get all Events 
const getEvents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

//Delete an Event 
const deleteEvent = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};

//View an Event 
const getEvent = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

//Update an Event 
const updateEvent = async (id,formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData);
    return response.data;
};

const eventService = {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent,
};

export default eventService;