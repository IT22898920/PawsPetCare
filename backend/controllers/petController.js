const asyncHandler = require("express-async-handler");
const PetAdoption = require("../models/PetModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const petAdoption = require("../models/PetModel");
const cloudinary = require("cloudinary").v2;


const createPet = asyncHandler(async (req, res) => {
  const { name, category, price, description } = req.body;

  // validation
  if (!name || !category || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
    let fileData = {};
    if (req.file) {

        //save image to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder : "pinvent App", resource_type: "image"})
            
        } catch (error) {
            res.status(500);
            throw new Error("Image cloud not be uploaded")
        }

  
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),// 2 is decimal
      };
    }

  // create pet
  const newPet = await PetAdoption.create({
    user: req.user.id,
    name,
    category,
    price,
    description,
    image: fileData, // Assuming you want to save file data with the pet
  });

  res.status(201).json(newPet);
});

//get all pets
const getPets = asyncHandler(async(req,res)=> {

    const petAdoption = await PetAdoption.find({user: req.user.id}).sort("-createAp")
    res.status(300).json(petAdoption)
});

module.exports = {
  createPet,getPets,
};
