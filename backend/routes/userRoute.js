const express = require("express");
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword, getAllUsers, getAllDocotrsController,
    applyDoctorController,
    bookeAppointmnetController,
    bookingAvailabilityController,
    userAppointmentsController} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");
const router = express.Router();

// const {
//     loginController,
//     registerController,
//     authController,
//     applyDoctorController,
//     getAllNotificationController,
//     deleteAllNotificationController,
//     getAllDocotrsController,
//     bookeAppointmnetController,
//     bookingAvailabilityController,
//     userAppointmentsController,
//   } = require("../controllers/userCtrl");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.get("/all", getAllUsers); // This will handle GET requests to /api/users/all
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

//APply Doctor || POST
router.post("/apply-doctor", applyDoctorController);

  //GET ALL DOC
  router.get("/getAllDoctors", getAllDocotrsController);
  
  //BOOK APPOINTMENT
  router.post("/book-appointment", bookeAppointmnetController);
  
  //Booking Avliability
  router.post(
    "/booking-availbility",
    bookingAvailabilityController
  );
  
  //Appointments List
  router.get("/user-appointments", userAppointmentsController);
  
module.exports = router;
