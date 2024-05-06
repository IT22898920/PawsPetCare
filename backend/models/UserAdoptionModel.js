const mongoose = require("mongoose");

const userAdoptionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    adoptionId: {
        type: String,
        required: true,
        default: "ID",
        trim: true,
    },
    cname: {
        type: String,
        required: [true, "Please add a name"],
    },
    caddress: {
        type: String,
        required: [true, "Please add an address"],
    },
    cnumber: {
        type: String,
        required: [true, "Please add a number"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
}, {
    timestamps: true,
});

const UserAdoption = mongoose.model("UserAdoption", userAdoptionSchema)
module.exports = UserAdoption;
