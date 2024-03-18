const express = require("express");
const { addToCart } = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware"); // Assuming you have authentication middleware
const router = express.Router();

// Add item to cart
router.post("/add", protect, addToCart);

// Other routes for updating and deleting cart items can be added here

module.exports = router;
