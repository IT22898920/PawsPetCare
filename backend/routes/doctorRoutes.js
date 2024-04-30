const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");
// const authMiddleware = require("../middleWare/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", updateProfileController);

//POST  GET SINGLE DOC INFO
router.post("/getDoctorById", getDoctorByIdController);

//GET Appointments
router.get(
  "/doctor-appointments",
  
  doctorAppointmentsController
);

//POST Update Status
router.post("/update-status", updateStatusController);

module.exports = router;
