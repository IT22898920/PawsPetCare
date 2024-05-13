import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../services/authService";

// import Dog from "../img/dog.jpg";
import jsPDF from "jspdf";

export default function ViewSchedule() {
  
  const [schedul, setschedul] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [formId, setformId] = useState("");
  
  // Get the current user from Redux state
  const user = useSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = await getUser();
        const currentId = userdata._id; // Extract current user's ID
        console.log(userdata);
        
        const response = await fetch(`http://localhost:5000/api/adopt-schedule/schedul/${currentId}`);
        const data = await response.json();

        console.log("data", data);

        if (data.length > 0) {
          setschedul(data);
        } else {
          setschedul([]);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [user]); // Fetch data whenever user changes


  //search function
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...schedul]);
    } else {
      // If there's a query, filter the data
      const filteredData = schedul.filter(
        (formm) =>
          formm.name && formm.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, schedul]);

  const handleDelete = async (formId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/adopt-schedule/deletee/${formId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setschedul((prev) => prev.filter((formm) => formm._id !== formId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  //report
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
  
    // Add title to PDF
    doc.setFontSize(20);
    doc.text("Schedule Details", 105, yPos, null, null, "center");
    yPos += 10;
  
    // Add details to PDF
    schedul.forEach((formm) => {
      doc.setFontSize(12);
      doc.text(20, yPos += 10, `Adoption ID: ${formm.petId}`);
      doc.text(20, yPos += 10, `Name: ${formm.name}`);
      doc.text(20, yPos += 10, `Email: ${formm.email}`);
      doc.text(20, yPos += 10, `Phone: ${formm.phone}`);
      doc.text(20, yPos += 10, `Date: ${new Date(formm.date).toLocaleDateString()}`);
      doc.text(20, yPos += 10, `Time: ${formm.time}`);
      yPos += 20; // Add a margin at the bottom of each entry
  
      // Draw a line for separation between entries
      if (schedul.indexOf(formm) < schedul.length - 1) {
        doc.setDrawColor(169, 169, 169); // Set the line color to a light grey
        doc.line(20, yPos, 190, yPos);
        yPos += 10;
      }
    });
  
    // Save the PDF
    doc.save("schedule_petcare.pdf");
  };
  
  return (
    <div>
      <div className="flex justify-center items-center text-3xl font-serif mt-4 text-slate-900">
        <h1>Schedule</h1>
      </div>
      <div className="ml-8 mt-7 flex justify-center items-center">
        <form>
        <input
          type="text"
          placeholder="Search... "
          className="w-[300px] h-8 rounded-lg shadow-xl"
          onChange={(e) => setQuery(e.target.value)}
          style={{
            backgroundColor: "#f0f0f0",
            border: "none",
            padding: "10px 20px",
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = "5px 5px 15px rgba(0, 0, 0, 0.3)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "5px 5px 15px rgba(0, 0, 0, 0.1)";
          }}
        />

        </form>
      </div>
      <div>
        <div className="flex justify-center items-center mt-4">
          {user && (
            <>
              <div className="flex justify-center items-center gap-4 ml-4">
              <button
                className="hidden sm:inline text-black font-serif py-2 px-4 rounded-full cursor-pointer"
                type="button"
                onClick={() => generatePDF()}
                style={{
                  backgroundColor: "#7469B6",
                  fontWeight: "bold",
                  border: "2px solid black",
                  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#7469B6";
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#7469B6";
                  e.target.style.transform = "scale(1.0)";
                }}
              >
                Generate Report
              </button>

              </div>
            </>
          )}
        </div>
        {user?.isAdmin && (
          <>
            <div className="flex justify-center items-center gap-6 mt-8 ml-12">
              <Link
                to={"/view"}
                className="hidden sm:inline   bg-orange-500 hover:bg-red-500  text-white font-serif  py-2 px-4   rounded-full cursor-pointer"
              >
                View all schedule
              </Link>
              <div></div>
            </div>
          </>
        )}
  
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            {filter && filter.length > 0 ? (
              <>
                {filter.slice(0, showMore ? filter.length : 2).map((formm) => (
                  <div
                    key={formm._id}
                    className="card m-2"
                    style={{ cursor: "pointer", width: "400px", height: "400px" }}
                  >
              
                    <div className="card-body">
                    <p>
                        <b>Adoption ID:</b> {formm.petId}
                      </p>
                      <p>
                        <b>Name:</b> {formm.name}
                      </p>
                      <p>
                        <b>Email:</b> {formm.email}
                      </p>
                      <p>
                        <b>Phone:</b> {formm.phone}
                      </p>
                      <p>
                        <b>Date:</b> {formm.date}
                      </p>
                      <p>
                        <b>Time:</b> {formm.time}
                      </p>
                    </div>
                    {user && (
                      <>
                        <div className="flex justify-center items-center gap-6 mt-6">
                        <Link
                          to={`/reschedule/${formm._id}`}
                          className="hidden sm:inline text-white font-serif py-2 px-6 rounded-xl cursor-pointer"
                          style={{
                            backgroundColor: "#007BFF",
                            fontWeight: "bold",
                            border: "2px solid #FFFFFF",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease",
                            textTransform: "uppercase",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#0056b3";
                            e.target.style.transform = "scale(1.05)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#007BFF";
                            e.target.style.transform = "scale(1.0)";
                          }}
                        >
                          Reschedule
                        </Link>


                          <div>
                          <button
                            onClick={() => {
                              setformId(formm._id);
                              handleDelete(formm._id); // Pass formId to handleDelete
                            }}
                            className="hidden sm:inline text-white font-serif py-2 px-6 rounded-xl cursor-pointer"
                            style={{
                              backgroundColor: "#A91D3A",
                              fontWeight: "bold",
                
                            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
                              transition: "all 0.3s ease",
                              textTransform: "uppercase",
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#C73659";
                              e.target.style.transform = "scale(1.1)";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "#A91D3A";
                              e.target.style.transform = "scale(1.0)";
                            }}
                          >
                            Cancel
                          </button>

                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {!showMore && schedul.length > 2 && (
                  <div className="mt-4 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
                    <button
                      className="text-white font-serif py-2 px-4 rounded-full cursor-pointer"
                      onClick={() => setShowMore(true)}
                      style={{
                        backgroundColor: "#ff5555",
                        fontWeight: "bold",
                        
                        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
                        transition: "all 0.3s ease",
                        textTransform: "uppercase",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#ff6b6b";
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#ff5555";
                        e.target.style.transform = "scale(1.0)";
                      }}
                    >
                      Show More
                    </button>

                  </div>
                )}
              </>
            ) : (
              <p>You have no items yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}
