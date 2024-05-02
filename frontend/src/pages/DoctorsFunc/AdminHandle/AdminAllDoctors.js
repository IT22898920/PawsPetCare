import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "antd";
import DocList from "./DocList";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
//   login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/getAllDoctors",

        {
        //   headers: {
        //     Authorization: "Bearer " + localStorage.getItem("token"),
        //   },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
<div>
  <h1 className="text-center"><b>Home Page</b></h1>
  <a href="/admin/doctorReq">req</a>
      <Row>
      {doctors && doctors.map((doctor) => <DocList key={doctor._id} doctor={doctor} />)}
      </Row>
</div>
      

  );
};

export default HomePage;
