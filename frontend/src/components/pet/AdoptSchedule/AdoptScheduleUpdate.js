import { combineSlices } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimezoneSelect from "react-timezone-select";
import { useSelector } from "react-redux";
import Dog from "../../../img/dog.jpg";  // Ensure this path is correct

export default function Update() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const currentId = user ? user._id : null;
  console.log(formData);
  const [publishError, setPublishError] = useState(null);
 
  const { updateId } = useParams();


  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };


  useEffect(() => {
    try {
      const fetchForm = async () => {
        const res = await fetch(
          `/api/user/schedul/${currentId}?UupdateId=${updateId}`
        );
        const data = await res.json();
       

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedform = data.find((formm) => formm._id === updateId);
          if (selectedform) {
            setFormData(selectedform);
            console.log(selectedform)

          }
        }
      };
      fetchForm();
    } catch (error) {
      console.log(error.message);
    }
  }, [updateId]);





  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/updatee/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate('/Viewschedul');
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };




 




  return (
    <div className="flex justify-center items-center gap-8 bg-[#583317] bg-opacity-80">
    
    <div>
    <img src={Dog} className="rounded-2xl ml-6" alt="Dog" />
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
                  value={formData.name}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Email</h3>

                <input
                  className="  p-3 rounded-lg w-[460px] h-11"
                  type="email"
                  placeholder="name@company.com"
                  id="Email"
                  onChange={handlchange}
                  value={formData.email}
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
                  value={formData.phone}
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Date</h3>
                <input
                  className="  p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="date"
                  id="date"
                  maxLength={10}
                  onChange={handlchange}
                  value={formData.date}
                />
              </div>

              <div>
                <select
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11 "
                  id="time"
                  onChange={handlchange}
                  value={formData.time}
                >
                  <option value="">Select Time</option>
                  <option value="08AM-10AM">08AM-10AM</option>
                  <option value="10PM-11PM">08AM-10AM</option>
                  <option value="10AM-01AM">10AM-11AM</option>
                  <option value="11AM-12PM">11AM-12PM</option>
                  <option value="02PM-04PM">02PM-04PM</option>
                  <option value="02PM-04PM">05PM-06PM</option>
                </select>
              </div>

              <button
                className=" bg-gray-600 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                type="submit"
              >
                schedule
              </button>
            </form>

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
