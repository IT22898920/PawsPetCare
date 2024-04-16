const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require ("cloudinary").v2;

//create Event
const createEvent = asyncHandler(async (req, res) => {
    const { name, category, venue, time, trainer, description } = req.body;

    //validation
    if (!name || !category || !venue || !time || !trainer || !description) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    


        //Handle Image upload
        let fileData = {}
        if (req.file) {
            //save image to cloudinary
            let uploadedFile;
            try{
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Pinvent App", resource_type: "image"}) 
            }catch (error) {
                res.status(500)
                throw new Error ("Image could not be uploaded")

            }

            fileData = {
                fileName: req.file.originalname,
                filePath: uploadedFile.secure_url,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            };
        }

        //Create event
        const event = await Event.create({
            user: req.user.id,
            name,
            category,
            venue,
            time,
            trainer,
            description,
            image: fileData
        });
        res.status(201).json(event);

});

//Get all Events
const getEvents = asyncHandler (async (req, res) => {
    const events =await Event.find({user: req.user.id}).sort("-createdAt");
    res.status(200).json(events);
});

//Get single Event
const getEvent = asyncHandler (async (req, res) => {
    const event = await Event.findById(req.params.id)
    
    //if event does not exist
    if (!event) {
        res.status(404)
        throw new Error ("Event not found")
    }

    //Match event to its user
    if (event.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ("User not authorized")
    }
    res.status(200).json(event);
});

//Delete Event
const deleteEvent = asyncHandler (async (req, res) => {
    const event = await Event.findById(req.params.id)
    
    //if event does not exist
    if (!event) {
        res.status(404);
        throw new Error ("Event not found");
    }

    //Match event to its user
    if (event.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error ("User not authorized");
    }
    await event.deleteOne();
    res.status(200).json({message:  "Event Deleted"});
});

//Update Event
const updateEvent = asyncHandler(async (req, res) => {
    const { name, category, venue, time, trainer, description } = req.body;
    req.body;
    const {id} = req.params


    const event = await Event.findById(id)

    //if event does not exist
    if (!event) {
        res.status(404);
        throw new Error ("Event not found");
    }
    //Match event to its user
    if (event.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error ("User not authorized");
    }

        //Handle Image upload
        let fileData = {};
        if (req.file) {
            
            //save image to cloudinary
            let uploadedFile;
            try{
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Pinvent App", resource_type: "image"}) 
            }catch (error) {
                res.status(500)
                throw new Error ("Image could not be uploaded")

            }

            fileData = {
                fileName: req.file.originalname,
                filePath: uploadedFile.secure_url,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            };
        }

        //Update Event
    const updatedEvent = await Event.findByIdAndUpdate(
    {_id: id},
    {
            name,
            category,
            venue,
            time,
            trainer,
            description,
            image: Object.keys(fileData).length ===0? event?.image : fileData,
    },

    {
        new: true,
        runValidators: true,
    }
);

        res.status(200).json(updatedEvent);
});

module.exports = {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent,
};
