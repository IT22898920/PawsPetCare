import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { getUser } from "../../../services/authService";

// import Dog from "../img/dog.jpg";

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

console.log(formData._id)
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const userdata = await getUser();
        console.log(userdata);
        const currentId = userdata._id;
  
        const res = await fetch(
          `http://localhost:5000/api/adopt-schedule/schedul/${currentId}?updateId=${updateId}`
        );
        const data = await res.json();
  
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        
        if (res.ok && data.length > 0) {
          // Assuming data is an array with a single item
          const selectedForm = data[0];
          setFormData(selectedForm);
        } else {
          console.log("No form data found.");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    fetchForm();
  }, [updateId]);
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/adopt-schedule/updatee/${formData._id}`, {
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
        navigate('/schedule'); // Correct the navigation path
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center gap-8 bg-[#583317] bg-opacity-80">
    
      <div>
        {/* <img src={Dog} className="rounded-2xl ml-6" alt="Dog" /> */}
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
                  defaultValue={formData.name} // Use defaultValue instead of value
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Email</h3>

                <input
                  className="  p-3 rounded-lg w-[460px] h-11"
                  type="email"
                  placeholder="name@company.com"
                  id="email" // Corrected ID
                  onChange={handlchange}
                  defaultValue={formData.email} // Use defaultValue instead of value
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Phone</h3>
                <input
                  className="  p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Phone"
                  id="phone" // Corrected ID
                  maxLength={10}
                  onChange={handlchange}
                  defaultValue={formData.phone} // Use defaultValue instead of value
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Date</h3>
                <DatePicker
                  className="  p-3 rounded-lg w-[460px] h-11"
                  id="date" // Corrected ID
                  onChange={(date) => setFormData({ ...formData, date })}
                  selected={formData.date ? new Date(formData.date) : null}
                  dateFormat="MM/dd/yyyy"
                />
              </div>

              <div>
                <select
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11 "
                  id="time"
                  onChange={handlchange}
                  defaultValue={formData.time} // Use defaultValue instead of value
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
                Schedule
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
