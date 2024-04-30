import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
// import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from 'react-router-dom';
import { getUser } from "../../../services/authService";


const BookingPage = () => {
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          // headers: {
          //   Authorization: "Bearer " + localStorage.getItem("token"),
          // },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ============ handle availiblity
  const handleAvailability = async () => {
    try {
      dispatch();
      const res = await axios.post(
        "http://localhost:5000/api/v1/doctor/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
          // },
        }
      );
      dispatch();
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch();
      console.log(error);
    }
  };

  
  const handleBooking = async () => {
    const userdata = await getUser();
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
  
      // Extract necessary user information
      const userInfoString = JSON.stringify({
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        photo: user.photo
      });
  // console.log(params.doctorId);
      const res = await axios.post(
        "http://localhost:5000/api/users/book-appointment",
        {
          doctorId: params.doctorId,
          userId: userdata._id,
          doctorInfo: doctors,
          userInfo: userInfoString, // Pass userInfo as a string
          date: date,
          time: time,
        },
        {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
          // },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        // navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : {doctors.feesPerCunsaltation}</h4>
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />

              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>

              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
