const asyncHandler = require("express-async-handler");
const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor Data Fetch Success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doc profile
const updateProfileController = asyncHandler(async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update Issue",
      error,
    });
  }
});

//get single docotor
const getDoctorByIdController = asyncHandler(async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single Doctor Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single Doctor Info",
    });
  }
});


const doctorAppointmentsController = asyncHandler(async (req, res) => {
  const { userId } = req.query; // Retrieve userId from query parameters

  try {
    // Find the doctor based on userId
    const doctor = await doctorModel.findOne({ userId: userId });

    // If doctor is not found, return an error
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    // Find appointments based on doctor's _id
    const appointments = await appointmentModel.find({ doctorId: doctor._id, status: { $in: ["approved", "pending"] } });


    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetched Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching Doctor Appointments",
    });
  }
});


const updateStatusController = asyncHandler(async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    // const notifcation = user.notifcation;
    // notifcation.push({
    //   type: "status-updated",
    //   message: `Your Appointment has been Updated ${status}`,
    //   onCLickPath: "/doctor-appointments",
    // });
    // await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
});

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
