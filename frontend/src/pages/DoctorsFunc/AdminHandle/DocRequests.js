import React, { useState, useEffect } from "react";
// import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn, selectRole } from "../../../redux/features/auth/authSlice"; // Corrected import

const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectRole); // Corrected use of selector

  useEffect(() => {
    if (!isLoggedIn || userRole !== 'admin') {
      navigate("/login");
      return;
    }

    dispatch(getDoctors());
  }, [dispatch, isLoggedIn, navigate, userRole]);



  const [doctors, setDoctors] = useState([]);
  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/admin/getAllDoctors", {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
          // },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getDoctors();
      }
    } catch (error) {
      // message.error("Something Went Wrong");
      console.log(error)
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button
                className="btn btn-danger ms-2"
                onClick={() => handleAccountStatus(record, "reject")}
              >
                Reject
              </button>
          )}
        </div>
      ),
    },
  ];

  return (
    
    <div>
      <h1 className="text-center m-3">Doctors Applications</h1>
      
      <Table columns={columns} dataSource={doctors} />
    </div>

  );
};

export default Doctors;
