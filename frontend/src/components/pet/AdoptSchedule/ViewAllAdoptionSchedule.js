import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Dog from "../img/dog.jpg";

export default function ViewAllAdoptionSchedule() {
  const { user } = useSelector((state) => state.auth);
  const currentId = user ? user._id : null;
  const [schedul, setschedul] = useState([]);
  const [showMore, setShowMore] = useState(false);
  console.log(schedul);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [formId, setformId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/adopt-schedule/schedull`);
        const data = await response.json();

        console.log("data", data);

        if (data.Details && data.Details.length > 0) {
          setschedul(data.Details);
        } else {
          setschedul([]);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [currentId]);

  //search funtion
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

  

  const sendEmail = async (email) => {
    console.log(email);
    try {
      const response = await fetch("http://localhost:5000/api/adopt-schedule/ship-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          subject: "The Auticon",
          text: "Your Item is On the Way!",
        }),
      });
  
      let data;
  
      if (response.headers.get("content-type").includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
  
      if (response.ok) {
        console.log("Email sent successfully:", data);
        // Optionally, display a success message to the user
        alert("Email sent successfully");
      } else {
        console.error("Error sending email:", data.message || data);
        // Optionally, display an error message to the user
        alert("Error sending email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Optionally, display an error message to the user
      alert("Error sending email");
    }
  };



  

  return (
    <div>
      <div className="flex justify-center items-center text-3xl font-serif mt-4 text-slate-900">
        <h1>Admin</h1>
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
                            <div>
                              <button
                                onClick={() => {
                                  sendEmail(formm.email); // Pass the email address to the sendEmail function
                                }}
                                className="hidden sm:inline bg-orange-500 hover:bg-red-500 bg-opacity-90 text-white font-serif py-2 px-6 rounded-xl cursor-pointer"
                              >
                                send email
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
