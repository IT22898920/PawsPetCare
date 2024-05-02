const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const moment = require("moment");

const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");

// Generate Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
const registerUser = asyncHandler ( async (req, res, next) => {
  const { name, email, password, role } = req.body; // Make sure to include 'role' if it's being sent from the front end
  try {
          // Validation
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please fill in the name and email");
        }
        if (password.length < 6) {
            res.status(400);
            throw new Error("Password must be up to 6 characters");
          }
        // Check if user email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("Email has already been registered");
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user', // Assign 'user' as default role if none provided

        });

        //   Generate Token
        const token = generateToken(user._id, user.role); // Include the user role here

        // Send HTTP-only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
        });

        if (user) {
            const { _id, name, email, photo, phone, bio } = user;
            res.status(201).json({
              _id,
              name,
              email,
              role,
              photo,
              phone,
              bio,
              token,
            });
          } else {
            res.status(400);
            throw new Error("Invalid user data");
          }


        //res.send("Register User");
    } catch (err) {
        next(err); 
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Validate Request
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }
  
    // Check if user exists
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
  
    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
  
    //   Generate Token
    const token = generateToken(user._id);
    
    if(passwordIsCorrect){
     // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
        });
    }
    // Modify the part in your loginUser function that sends the response
if (user && passwordIsCorrect) {
  const { _id, name, email, role, isDoctor } = user; // Include role here
  res.status(200).json({
    _id,
    name,
    email,
    role, // Send role to the frontend
    isDoctor,
    token,
  });
} else {
  res.status(400);
  throw new Error("Invalid email or password");
}
});

// Logout User
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" });
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);
  
    if (user) {
      const { _id, name, email, photo, phone, bio } = user;
      res.status(200).json({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
      });
    } else {
      res.status(400);
      throw new Error("User Not Found");
    }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {

    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }
    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      return res.json(true);
    }
    return res.json(false);
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
        // Fetch all users from the database without their passwords
        const users = await User.find({}).select('-password');

      // Send the users as a response
      res.status(200).json(users);
  } catch (error) {
      // If an error occurs, send a 500 status code and the error message
      res.status(500).json({ message: error.message });
  }
});



// Update User
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      const { name, email, photo, phone, bio ,role} = user;
      user.email = email;
      user.name = req.body.name || name;
      user.phone = req.body.phone || phone;
      user.bio = req.body.bio || bio;
      user.photo = req.body.photo || photo;
      if(req.user.role === 'admin') {
        user.role = req.body.role || user.role;
    }

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        photo: updatedUser.photo,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  //change password
  const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
    //Validate
    if (!oldPassword || !password) {
      res.status(400);
      throw new Error("Please add old and new password");
    }
  
    // check if old password matches password in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
  
    // Save new password
    if (user && passwordIsCorrect) {
      user.password = password;
      await user.save();
      res.status(200).send("Password change successful");
    } else {
      res.status(400);
      throw new Error("Old password is incorrect");
    }
  });

  const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }
  
    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }
  
    // Create Reste Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);
    // Hash token before saving to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
      //console.log(hashedToken);

    // Save Token to DB
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 40 * (60 * 1000), // fourty minutes
    }).save();
  
    // Construct Reset Url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  
    // Reset Email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>  
        <p>This reset link is valid for only 40 minutes.</p>
  
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  
        <p>Regards...</p>
        <p>Pinvent Team</p>
      `;
    const subject = "Password Reset Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
  
    try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({ success: true, message: "Reset Email Sent" });
      } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again");
      }   
  });


    // Reset Password
    const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;
  
    // Hash token, then compare to Token in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // fIND tOKEN in DB
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });
  
    if (!userToken) {
      res.status(404);
      throw new Error("Invalid or Expired Token");
    }
  
    // Find user
    const user = await User.findOne({ _id: userToken.userId });
    user.password = password;
    await user.save();
    res.status(200).json({
      message: "Password Reset Successful, Please Login",
    });
  });
  
// Apply Doctor CTRL
const applyDoctorController = asyncHandler(async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    // const adminUser = await User.findOne({ isAdmin: true });
    // const notifcation = adminUser.notifcation;
    // notifcation.push({
    //   type: "apply-doctor-request",
    //   message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
    //   data: {
    //     doctorId: newDoctor._id,
    //     name: newDoctor.firstName + " " + newDoctor.lastName,
    //     onClickPath: "/admin/docotrs",
    //   },
    // });
    // await User.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctotr",
    });
  }
});




//GET ALL DOC
const getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro While Fetching Doctor",
    });
  }
};

//BOOK APPOINTMENT
const bookeAppointmnetController = asyncHandler(async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    // const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    // user.notifcation.push({
    //   type: "New-appointment-request",
    //   message: `A new Appointment Request from ${req.body.userInfo.name}`,
    //   onCLickPath: "/user/appointments",
    // });
    // await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
});

// booking bookingAvailabilityController
const bookingAvailabilityController = asyncHandler(async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments Available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
});

const userAppointmentsController = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  try {
    const appointments = await appointmentModel.find({
      userId: userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
});


module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    getAllUsers,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
    applyDoctorController,
    getAllDocotrsController,
    bookeAppointmnetController,
    bookingAvailabilityController,
    userAppointmentsController
};