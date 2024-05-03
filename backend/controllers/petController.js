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
  const petAdoption = await PetAdoption.find({user: req.user.id}).sort("-createAp");
  res.status(200).json(petAdoption); // <-- Change status code to 200
});


const getPet = asyncHandler(async (req, res) => {
  const pet = await PetAdoption.findById(req.params.id);
  // If the pet doesn't exist
  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }
  // Check if the user is authorized to access the pet
  if (pet.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(pet);
});

//delete pets
const deletePet = asyncHandler(async (req,res) =>{

  const pet = await PetAdoption.findById(req.params.id);
  // If the pet doesn't exist
  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }
  // Check if the user is authorized to access the pet
  if (pet.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json({message : "Pet deleted"});
});





//update pet

const updatePet = asyncHandler(async (req, res) => {
  const { name, category, price, description } = req.body;
  const { id } = req.params;

  // Find the pet by ID
  const pet = await PetAdoption.findById(id);

  // If the pet doesn't exist
  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }

  // Check if the user is authorized to update the pet
  if (pet.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "pinvent App",
        resource_type: "image"
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2) // 2 is decimal
    };
  }

  // Update pet
  const updatedPet = await PetAdoption.findByIdAndUpdate(
    id,
    {
      user: req.user.id,
      name,
      category,
      price,
      description,
      image: Object.keys(fileData).length === 0 ?  fileData || pet?.image :
      fileData,// Preserve existing image if new image is not uploaded
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json(updatedPet);
});

module.exports = {
  createPet,
  getPets,
  getPet,
  deletePet,
  updatePet
};