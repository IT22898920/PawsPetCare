import React, { useEffect, useState } from "react";
import "./eventList.scss";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import SearchEvent from "../../searchEvent/SearchEvent";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_EVENTS, selectFilteredEvents } from "../../../redux/features/event/eventFilterSlice";
import ReactPaginate from 'react-paginate';
import jsPDF from "jspdf";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteEvent, getEvents } from "../../../redux/features/event/eventSlice";
import { Link } from "react-router-dom";

const EventList = ({events, isLoading}) => {

    const [searchEvent, setSearchEvent] = useState("");
    const filteredEvents = useSelector(selectFilteredEvents);
    const [reportType, setReportType] = useState("csv");
    const dispatch = useDispatch()

    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...")
            return shortenedText
        }
        return text;
    };

    const delEvent = async(id) => {
        console.log(id)
         await dispatch(deleteEvent(id));
         await dispatch(getEvents());
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete Event',
            message: 'Are you sure to delete this event?',
            buttons: [
              {
                label: 'Delete',
                onClick: () => delEvent(id)
              },
              {
                label: 'Cancel',
                //onClick: () => alert('Click No')
              }
            ]
          });
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

    
  // CSV Report Generation
  const generateCSVReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Category,Date,Venue,Time,Trainer\n";

    filteredEvents.forEach(event => {
      const { name, category, date, venue, time, trainer } = event;
      
      csvContent += `${name},${category},${date},${venue},${time}, ${trainer}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "event_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

// PDF Report Generation
const generatePDFReportEvent = () => {
  const doc = new jsPDF();
  const tableColumn = ["Name", "Category", "Date", "Venue", "Time", "Trainer"];
  const tableRows = [];

  filteredEvents.forEach(event => {
    const { name, category, date, venue, time, trainer } = event;
   
    tableRows.push([name, category, date, venue, time, trainer]);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.text("Events Report", 14, 15);

  // Add current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  doc.setFontSize(10);
  doc.text(`Generated on: ${formattedDate}`, 10, doc.internal.pageSize.height - 20); // Adjust position as needed

  // Add manager's signature placeholder
  doc.text("Manager's Signature:", 10, doc.internal.pageSize.height - 10); // Adjust position as needed
  doc.line(60, doc.internal.pageSize.height - 10, 150, doc.internal.pageSize.height - 10); // Draw line for signature

  doc.save("events_report.pdf");
};


  // Dropdown for report type selection
  const reportTypeSelector = (
    <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={{ margin: "10px 0", padding: "5px" }}>
      <option value="csv">CSV</option>
      <option value="pdf">PDF</option>
    </select>
  );

  // Generate Report Button
  const handleGenerateReport = () => {
    if (reportType === "csv") {
        generateCSVReport();
    }else if (reportType === "pdf") {
        generatePDFReportEvent();
    }
  };

    return (
    
    <div className="event-list">
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
            <div className="report-options">
            {/* Add the reportTypeSelector dropdown here */}
                {reportTypeSelector}
            {/* Add the generate report button here */}
                <button onClick={handleGenerateReport}>Generate Report</button>
            </div>
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
                                                        <Link to={`/event-detail/${_id}`}>
                                                        <AiOutlineEye size = {25}
                                                        color={"purple"}/>
                                                        </Link>
                                                    </span>
                                                    <span>
                                                        <FaEdit size = {20}
                                                        color={"green"}/>
                                                    </span>
                                                    <span>
                                                        <FaTrashAlt 
                                                        size = {19}
                                                        color={"red"} onClick={() => confirmDelete(_id)}/>
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
    </div>
    );
};

export default EventList;