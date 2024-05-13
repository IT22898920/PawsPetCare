import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Input } from "antd";
import DoctorList from "./DoctorList";
const { Search } = Input;
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/getAllDoctors",

        {
          // headers: {
          //   Authorization: "Bearer " + localStorage.getItem("token"),
          // },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
        setFilteredDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase()); // Ensure search query is in lowercase
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDoctors(doctors); // If search query is empty, display all doctors
    } else {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.firstName.toLowerCase().includes(searchQuery) ||
          doctor.lastName.toLowerCase().includes(searchQuery) ||
          doctor.specialization.toLowerCase().includes(searchQuery)
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);
  return (
<div>
  <h1 className="text-center"><b>Our Great Doctors</b></h1>

  <Row>
        <div style={{ float: 'left', marginRight: '10px' }}>
          <Search
            placeholder="Search by doctor name or specialization"
            allowClear
            enterButton={false} // Disable the search button
            size="small"
            onChange={(e) => handleSearch(e.target.value)} // Listen to onChange event and update search query
            style={{ border: '1px solid #1890ff', borderRadius: '4px' }} 
          />
        </div>
      </Row>
 
      <Row>
      {doctors && doctors.map((doctor) => <DoctorList key={doctor._id} doctor={doctor} />)}
      </Row>
</div>
      

  );
};

export default HomePage;
