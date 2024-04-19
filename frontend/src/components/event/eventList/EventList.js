import React, { useEffect, useState } from "react";
import "./eventList.scss";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import SearchEvent from "../../searchEvent/SearchEvent";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_EVENTS, selectFilteredEvents } from "../../../redux/features/event/eventFilterSlice";
import ReactPaginate from 'react-paginate';

const EventList = ({events, isLoading}) => {

    const [searchEvent, setSearchEvent] = useState("");
    const filteredEvents = useSelector(selectFilteredEvents);
    
    const dispatch = useDispatch()

    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...")
            return shortenedText
        }
        return text;
    };

    //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredEvents.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredEvents.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredEvents]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredEvents.length;
    setItemOffset(newOffset);
  };

    // End Pagination

    useEffect(() => {
        dispatch(FILTER_EVENTS({events, searchEvent}))
    }, [events, searchEvent, dispatch]);

    return <div className="event-list">
        <hr />
        <div className="table">
           <div className="--flex-between --flex-dir-column">
            <span>
                <h3>Event List</h3>
            </span>
            <span>
                <SearchEvent 
                value={searchEvent} 
                onChange={(e) =>
                setSearchEvent(e.target.value)} />
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
                                
                                    { currentItems.map((event, index) => {
                                        const {_id, name, category, date, venue, time, trainer } =
                                        event;
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
                <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
        </div>
    </div>;
    
};

export default EventList;