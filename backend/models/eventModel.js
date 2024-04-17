const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please add event name"],
    trim: true 
  },

  category: {
    type: String,
    required: [true, "Please add the category"],
    trim: true 
  },

  date: {
    type: String,
    required: [true, "Please add the date"],
    trim: true 
  },

  venue: {
    type: String,
    required: [true, "Please add the venue"],
    trim: true 
},


  time: {
    type: String,
    required: [true, "Please add the starting time"],
    trim: true 
  },

  trainer: {
    type: String,
    required: [true, "Please add the trainer name"],
    trim: true 
  },

  description: {
    type: String,
    required: [true, "Please add the description"],
    trim: true 
  },

  image: {
    type: Object,
    default: {}
  },
 
}, {
    timestamps: true,
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
