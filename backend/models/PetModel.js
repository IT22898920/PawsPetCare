const mongoose = require("mongoose");

const petAdoptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please add a name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "please add a category"],
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "please add a description"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const petAdoption = mongoose.model("PetAdoption", petAdoptionSchema);
module.exports = petAdoption;
