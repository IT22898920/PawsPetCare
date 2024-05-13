
  
const asyncHandler = require("express-async-handler");
const Shedul = require('../models/AdoptSchedule');
const nodemailer = require("nodemailer");

//shedul create

const Schedulcreate = asyncHandler(async (req, res, next) => {
  

    const {  currentId,petId, name, email, phone, date,time } = req.body;
  
    const newShedul = new Shedul({
      currentId,
      petId,
      name,
      email,
      phone,
      date,
      time
    });
    try {
      const savedShedul = await newShedul.save();
      res.status(201).json(savedShedul);
    } catch (error) {
      next(error);
    }
  });
  
  
  //currret user shedul get
  const getschedul = asyncHandler(async (req, res, next) => {
      
    try {
      const { currentId } = req.params;
      console.log(currentId)
  
      
      const shedul = await Shedul.find({ currentId });
      console.log(shedul)
  
      
  
      
      res.json(shedul);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  //get all shedul
  const allgetSchedul = asyncHandler(async (req, res, next) => {
  
    // if (!req.user.isAdmin) {
    //   return next(errorHandle(403, "You are not allowed to delete this shedul"));
    // }
  
    
    try {
  
        const Details =  await Shedul.find();
  
        if (Details.length > 0) {
          res.json({
            message: "shedule details retrieved successfully",
            Details,
          });
        } else {
          return next(errorHandle(404, "shedule not fonud "));
        }
  
        
      
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
  });
  
  //update shadul
  const updateschedul = asyncHandler(async (req, res, next) => {
   
    try {
      const updateSchedul = await Shedul.findByIdAndUpdate(
        req.params.schedulId,
        {
          $set: {
            currentId: req.body.currentId,
            name: req.body.name,
            Email: req.body.Email,
            phone: req.body.phone,
            date: req.body.date,
            time: req.body.time
          },
        },
        { new: true }
      );
      res.status(200).json(updateSchedul);
    } catch (error) {
      next(error);
    }
  });
  
  
  //cancel shedul
  const deleteSchedul = asyncHandler(async (req, res, next) => {
   
    try {
      await Shedul.findByIdAndDelete(req.params.scheduId);
      res.status(200).json('shedule has been deleted');
    } catch (error) {
      next(error);
    }
  });
  
  
  //ship main 
  const shipsend = asyncHandler(async (req, res, next) => {
    const { email, subject, text } = req.body;  // Correctly destructure the properties
  
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      auth: {
        user: "pawsreservation@outlook.com",
        pass: "adiffrenthope",
      },
    });
  
    const mailOptions = {
      from: "pawsreservation@outlook.com",
      to: email,
      subject: subject,  // Use the subject from the request
      html: `
        <div style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background: white; padding: 20px;'>
          <h2>Hello,</h2>
          <p>Thank you for scheduling a visit with us. We are excited to introduce you to your potential new best friend!</p>
          <p>Please remember to download the PDF receipt and kindly arrive least 10 minutes before your scheduled time to ensure a smooth process.</p>
          <p>If you have any questions or need to reschedule, please don't hesitate to contact us.</p>
          <p>Looking forward to seeing you soon!</p>
          <p>Best regards,</p>
          <p>The Paws Reservation Team</p>
        </div>
      `,
    };
    
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        next(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  });
  const checkScheduleAvailability = asyncHandler(async (req, res, next) => {
    const { date, time } = req.body;
    const existingSchedule = await Shedul.findOne({ date, time });
  
    if (existingSchedule) {
      return res.status(400).json({ message: "This date and time are already booked." });
    }
  
    next(); // If there is no conflict, move to the next middleware (usually the creation of the schedule)
  });


  module.exports = {
    Schedulcreate,
    getschedul,
    allgetSchedul,
    updateschedul,
    deleteSchedul,
    shipsend,
    checkScheduleAvailability
  };
  