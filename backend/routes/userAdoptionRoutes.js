const express = require('express');
const { createUserAdoption } = require('../controllers/UserAdoptionController');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

router.post("/", protect, createUserAdoption);

module.exports = router;
