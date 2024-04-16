import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/events`;

//Create New Event 
const createEvent = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

const eventService = {
    createEvent,
};

export default eventService;