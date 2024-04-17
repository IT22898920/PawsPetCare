import React from "react";
import "./eventList.scss";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const EventList = ({events, isLoading}) => {
    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...")
            return shortenedText
        }
        return text;
    };

    return <div className="event-list">
        <hr />
        <div className="table">
           <div className="--flex-between --flex-dir-column">
            <span>
                <h3>Event List</h3>
            </span>
            <span>
                <h3>Search Event</h3>
            </span>
            </div> 

                {isLoading && <SpinnerImg />}

                <div className="table">
                    {!isLoading && events.length === 0 ? (
                        <p>-- No event found, please add an event...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Event Code</th>
                                    <th> Name</th>
                                    <th> Category</th>
                                    <th> Date</th>
                                    <th> Venue</th>
                                    <th> Time</th>
                                    <th> Trainer</th>
                                    <th> Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    events.map((event, index) => {
                                        const {_id, name, category, date, venue, time, trainer }=
                                        event
                                        return (
                                            <tr key={_id}>
                                                <td>{index +1}</td>
                                                <td>{shortenText(name, 16)}</td>
                                                <td>{category}</td>
                                                <td>{date}</td>
                                                <td>{venue}</td>
                                                <td>{time}</td>  
                                                <td>{trainer}</td> 
                                                <td className="icons">
                                                    <span>
                                                        <AiOutlineEye size = {25}
                                                        color={"purple"}/>
                                                    </span>
                                                    <span>
                                                        <FaEdit size = {20}
                                                        color={"green"}/>
                                                    </span>
                                                    <span>
                                                        <FaTrashAlt size = {19}
                                                        color={"red"}/>
                                                    </span>
                                                </td>                                             
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    )}
                </div>

        </div>
    </div>;
    
};

export default EventList;