const asyncHandler = require("express-async-handler");
const PetAdoptions = require('../models/UserAdoptionModel');

const createUserAdoption = asyncHandler(async (req, res) => {
    const { cname, caddress, cnumber, description } = req.body;

    // Validation
    if (!cname || !caddress || !cnumber || !description) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const petAdoption = await PetAdoptions.create({
        user: req.user.id,
        cname,
        caddress,
        cnumber,
        description,
    });

    res.status(201).json(petAdoption);
});






module.exports = {
    createUserAdoption
};
