const express = require("express");
const router = express.Router();
const { createBlog } = require("../controllers/blogController");
const protect = require("../middleWare/authMiddleware");


router.post("/", protect, createBlog);

module.exports = router;