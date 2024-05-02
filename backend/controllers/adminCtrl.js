const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");


const getAllUsersController = asyncHandler(async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Users Data List",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While fetching users",
      error,
    });
  }
});

const getAllDoctorsController = asyncHandler(async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: { $in: ["approved", "pending"] } });

    res.status(200).send({
      success: true,
      message: "Doctors Data List",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Doctors Data",
      error,
    });
  }
});

// doctor account status
const changeAccountStatusController = asyncHandler(async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    // Update the status of the doctor
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true });

    // Check if doctor exists
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    // Find the user corresponding to the doctor
    const user = await userModel.findOne({ _id: doctor.userId });

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if(status==="approved"){
      user.role = status === "approved" ? "doctor" : "user";
    } else{
      user.role = status === "reject" ? "user" : "user";
    }
    
    await user.save();

    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
});





module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
};
