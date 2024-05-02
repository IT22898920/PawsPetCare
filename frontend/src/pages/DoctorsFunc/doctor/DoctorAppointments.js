import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";
import { getUser } from "../../../services/authService";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Function to fetch appointments
  const getAppointments = async () => {
    const data = await getUser();
    console.log(data._id); // Make sure this logs the user ID properly
  
    try {
      const res = await axios.get("http://localhost:5000/api/v1/doctor/doctor-appointments", {
        params: {
          userId: data._id // Pass the doctor's user ID to the backend
        }
      });
  
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch appointments.");
    }
  };
  

  useEffect(() => {
    getAppointments();
  }, []);

 // Function to handle status change
 const handleStatus = async (record, status) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/doctor/update-status",
      { appointmentsId: record._id, status },
      {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      }
    );
    if (res.data.success) {
      message.success(res.data.message);
      // window.location.reload();
      getAppointments(); // Refresh appointments list
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    message.error("Something Went Wrong");
  }
};

// Columns definition for Table
const columns = [
  {
    title: "ID",
    dataIndex: "_id",
  },
  {
    title: "Date & Time",
    dataIndex: "date",
    render: (text, record) => (
      <span>
        {moment(record.date).format("DD-MM-YYYY")} &nbsp;
        {moment(record.time).format("HH:mm")}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (text, record) => (
      <div className="d-flex">
        {record.status === "pending" && (
          <div className="d-flex">
            <button
              className="btn btn-success"
              onClick={() => handleStatus(record, "approved")}
            >
              Approve
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleStatus(record, "reject")}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    ),
  },
];


  return (
    <div>
      <h1>Appointments List</h1>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={appointments}
      />
    </div>
  );
};

export default DoctorAppointments;
