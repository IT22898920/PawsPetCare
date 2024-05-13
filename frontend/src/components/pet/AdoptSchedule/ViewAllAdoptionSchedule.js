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
    <div className="min-h-screen bg-white">
      <div className="text-center py-6 text-4xl font-serif text-gray-800">
        <h1>Admin</h1>
      </div>
      <div className="flex justify-center py-6">
  <input
    type="text"
    placeholder="Search... "
    style={{
      width: '500px',
      padding: '10px 20px',
      borderRadius: '15px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      backgroundColor: '#f2f2f2',
      color: '#757575',
    }}
    onChange={(e) => setQuery(e.target.value)}
  />
</div>

      <div className="flex justify-center flex-wrap gap-4">
        {filter && filter.length > 0 ? (
          filter.slice(0, showMore ? filter.length : 2).map((formm) => (
            <div
              key={formm._id}
              className="card m-2"
              style={{ cursor: "pointer" }}
            >
              
              <div className="card-body">
              <p>
                  <b>Name</b> {formm.name}
                </p>
                <p>
                  <b>Email</b> {formm.email}
                </p>
                <p>
                  <b>Phone</b> {formm.phone}
                </p>
                <p>
                  <b>Date</b> {formm.date}
                </p>
                <p>
                  <b>Time</b> {formm.time}
                </p>
              </div>
              {user && (
                <div className="mt-6">
<button
  onClick={() => {
    sendEmail(formm.email); // Pass the email address to the sendEmail function
  }}
  style={{
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#FF5733',
    color: 'white',
    fontFamily: 'serif',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.5s ease',
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = '#FF0000';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = '#FF5733';
  }}
>
  Send Email
</button>

                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-600">You have no items yet</p>
        )}
      </div>
      {!showMore && schedul.length > 2 && (
        <div className="mt-4 mb-4 text-center">
          <button
            className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
            onClick={() => setShowMore(true)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
  
  
  
}
