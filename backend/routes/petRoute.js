const express = require("express");
const protect = require("../middleWare/authMiddleware");
const { createPet, getPets, getPet, deletePet, updatePet } = require("../controllers/petController");
const { upload } = require("../utils/fileUpload");
const router = express.Router();
upload

router.post("/",protect, upload.single("image"), createPet);
router.patch("/:id",protect, upload.single("image"), updatePet);
router.get("/",protect,  getPets);
router.get("/:id",protect,  getPet);
router.delete("/:id",protect, deletePet);




module.exports = router;