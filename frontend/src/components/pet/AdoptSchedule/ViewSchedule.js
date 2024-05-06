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
    let yPos = 10;

    // Add house details to PDF
    doc.setFontSize(16);
    doc.text(20, yPos, "Schedul Details:");
    yPos += 10;

    schedul.forEach((formm) => {
      doc.setFontSize(12);
      doc.text(20, yPos, `Name: ${formm.name}`);
      doc.text(20, yPos + 5, `Email: ${formm.email}`);
      doc.text(20, yPos + 10, `Phone: ${formm.Phone}`);
      doc.text(20, yPos + 15, `Date: ${formm.date}`);
      doc.text(20, yPos + 20, `Time: ${formm.time}`);

      yPos += 35;
    });

    // Save the PDF
    doc.save("schedul_petcare.pdf");
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
            className=" w-[300px] h-8 rounded-lg shadow-xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      <div>
        <div className="flex justify-center items-center mt-4">
          {user && (
            <>
              <div className="flex justify-center items-center gap-4 ml-4">
                <button
                  className="hidden sm:inline  hover:underline bg-red-700 hover:bg-red-500  text-white font-serif py-2 px-4  rounded-full"
                  type="button"
                  onClick={() => generatePDF()}
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
                view all shedule
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
                    className="w-[400px] h-[400px] mt-10 mb-10 rounded-xl border border-black bg-orange-600 bg-opacity-10 shadow-xl"
                  >
                    <div className="px-6 py-4">
                      <div className=" border border-black rounded-3xl mt-6 h-64  bg-white bg-opacity-50 shadow-2xl">
                      <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">Adoption ID:</div>
                          <div className="font-extralight text-md mb-2 max-w-[200px] break-words">
                            {formm.petId}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">Name:</div>
                          <div className="font-extralight text-md mb-2 max-w-[200px] break-words">
                            {formm.name}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">Email</div>
                          <div className=" text-md mb-2 max-w-[200px] font-extralight break-words">
                            {formm.email}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">Phone</div>
                          <div className=" text-md mb-2 max-w-[100px] font-extralight break-words">
                            {formm.phone}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">Date</div>
                          <div className="text-gray-700  text-sm mt-2   max-w-[200px] font-extralight break-words">
                            {formm.date}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="font-extralight text-md">Time</div>
                          <div className="text-gray-700  text-sm mt-2   max-w-[200px] font-extralight break-words">
                            {formm.time}
                          </div>
                        </div>
                      </div>
                      {user && (
                        <>
                          <div className="flex justify-center items-center gap-6 mt-6">
                            <Link
                              to={`/reschedule/${formm._id}`}
                              className="hidden sm:inline   bg-orange-500 hover:bg-red-500 bg-opacity-90  text-white font-serif  py-1 px-8  rounded-xl cursor-pointer"
                            >
                              Reschedule
                            </Link>
                            <div>
                              <button
                                onClick={() => {
                                  setformId(formm._id);
                                  handleDelete(formm._id); // Pass formId to handleDelete
                                }}
                                className="hidden sm:inline    bg-orange-500 hover:bg-red-500  bg-opacity-90 text-white font-serif py-2 px-6  rounded-xl cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {!showMore && schedul.length > 2 && (
                  <div className="mt-4 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                      onClick={() => setShowMore(true)}
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
