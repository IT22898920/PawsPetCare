const express = require("express");
const protect = require("../middleWare/authMiddleware");
const { createPet, getPets } = require("../controllers/petController");
const { upload } = require("../utils/fileUpload");
const router = express.Router();
upload

router.post("/",protect, upload.single("image"), createPet);
router.get("/",protect,  getPets);

module.exports = router;