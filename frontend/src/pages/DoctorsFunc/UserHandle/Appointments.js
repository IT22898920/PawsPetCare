import React, { useState, useEffect } from "react";
import axios from "axios";
// import Layout from "./../components/Layout";
import moment from "moment";
import { Table } from "antd";
import { getUser } from "../../../services/authService";


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    const data = await getUser();
    try {
      const res = await axios.get("http://localhost:5000/api/users/user-appointments", {
        params: {
          userId: data._id // Pass the doctor's user ID to the backend
        }
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },
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
  ];

  return (
    <div>
      <h1>Appointments List</h1>
      <Table columns={columns} dataSource={appointments} />
    </div>
  );
};

export default Appointments;
