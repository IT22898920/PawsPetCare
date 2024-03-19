const express = require ("express");
const protect = require("../middleWare/authMiddleware");
const { createEvent, 
        getEvents, 
        getEvent, 
        deleteEvent,
        updateEvent
    } = require("../controllers/eventController");
const router = express.Router();
const {upload} = require ("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createEvent);
router.patch("/:id", protect, upload.single("image"), updateEvent);
router.get("/", protect, getEvents);
router.get("/:id", protect, getEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
