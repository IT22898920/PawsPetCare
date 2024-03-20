const express = require("express");
const router = express.Router();
const { createBlog, getblogs , getblog, deleteblog, updatedblog} = require("../controllers/blogController");
const protect = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");




router.post("/",protect, upload.single("image"), createBlog);
router.patch("/:id",protect, upload.single("image"), updatedblog);
router.get("/", protect, getblogs);
router.get("/:id", protect,  getblog);
router.delete("/:id", protect,  deleteblog);

module.exports = router;