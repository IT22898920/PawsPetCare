const express = require("express");
const { 
    createProduct, 
    getProducts, 
    getProduct, 
    deleteProduct, 
    updateProduct,
    getcategory,
  } = require('../controllers/productController');const protect = require("../middleWare/authMiddleware");
const router = express.Router();
const { upload } = require("../utils/fileUpload");


router.post("/", protect, upload.single("image"), createProduct);
router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/", protect, getProducts);
router.get("/category", protect, getcategory);
router.get("/:id", protect, getProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
