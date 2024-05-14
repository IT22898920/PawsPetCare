import { combineSlices } from "@reduxjs/toolkit";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimezoneSelect from "react-timezone-select";
import { getUser } from "../../../services/authService";
import { useParams } from 'react-router-dom';

export default function AdoptSchedule() {
  const { petId } = useParams();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null); // Add this line
  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      
      // Fetch user data
      const userdata = await getUser();
  
      // Construct data object including user's ID
      const Data = {
        currentId: userdata._id,
        petId: petId, 
        ...formData,
      };
  
      // Send POST request with the data
      const res = await fetch("http://localhost:5000/api/adopt-schedule/schcreate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      setNotification('Reservation placed!');

    } catch (error) {
      setErrorMessage(error.message);
    }
  };


  return (
    <div className="flex justify-center items-center gap-8 bg-[#583317] bg-opacity-80">
      <div>
        {/* <img src={Dog}  className="rounded-2xl ml-6" /> */}
      </div>
     
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Name</h3>
                <input
                  className="  p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Name"
                  id="name"
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Email</h3>

                <input
                  className="  p-3 rounded-lg w-[460px] h-11"
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">phone</h3>
                <input
                  className="  p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="phone"
                  id="phone"
                  maxLength={10}
                  onChange={handlchange}
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Date</h3>
                <input
                  className="  p-3 rounded-lg w-[460px] h-11"
                  type="date"
                  placeholder="mm/dd/yy"
                  id="date"
                  maxLength={10}
                  onChange={handlchange}
                />
              </div>

              <div>
                <select
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11 "
                  id="time"
                  onChange={handlchange}
                >
                  <option value="">Select Time</option>
                  <option value="08AM-10AM">08AM-10AM</option>
                  <option value="10PM-12PM">10AM-12AM</option>
                  <option value="12AM-01AM">12AM-02PM</option>
                  <option value="02AM-04PM">02AM-04PM</option>
                  <option value="04PM-06PM">04PM-06PM</option>
                  <option value="06PM-08PM">06PM-08PM</option>
                </select>
              </div>

              <button
  className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 px-6 rounded-lg w-[460px] h-11 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
  type="submit"
>
  Schedule
</button>

            </form>

            {notification && (
        <p className="mt-5 text-green-600 bg-green-300 w-300 h-7 rounded-lg text-center ">
          {notification}
        </p>
      )}

            {errorMessage && (
              <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
