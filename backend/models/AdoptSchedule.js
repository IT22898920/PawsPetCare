const mongoose = require("mongoose");

const AdoptScheduleSchema = new mongoose.Schema(
  {
    currentId: {
        type: String,
        required: true,
        
      },
      petId: {
        type: String,
        required: true,
        
      },
  
    name: {
        type: String,
        required: true,
        
      },
    email: {
        type: String,
        required: true,
        
      },
   
    phone: {
      type: Number,
      required: true,
      
    },
    date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
     
      },
   
   
   
  },
  { timestamps: true }
);

const AdoptSchedule = mongoose.model('AdoptSchedule', AdoptScheduleSchema);

module.exports = AdoptSchedule;
