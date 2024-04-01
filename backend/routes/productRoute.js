const express = require("express");
const { 
    createProduct, 
    getProducts, 
    getProduct, 
    deleteProduct, 
    updateProduct,
    getcategory,
    getOutOfStockProducts,
    reorderProduct, // Assuming you have this controller for handling reorders
} = require('../controllers/productController');
const protect = require("../middleWare/authMiddleware");
const router = express.Router();
const { upload } = require("../utils/fileUpload");
const { Cartcrete, getCartItem, CheckOutcrete, deleteItems, deleteItemss, viewCheckoutsByEmail } = require("../controllers/cartController");

router.post("/", protect, upload.single("image"), createProduct);
router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/", protect, getProducts);
router.get("/category", protect, getcategory);
router.get("/outofstock", protect, getOutOfStockProducts);
router.get("/:id", protect, getProduct);
router.delete("/:id", protect, deleteProduct);

router.post('/Cart',  Cartcrete);
router.get('/cartitem/:useremail', getCartItem)
router.post('/Checkout',  CheckOutcrete);
router.delete('/deleteitems/:itemsId',  deleteItems)//delete specific item from cart
router.delete('/deletCurretId/:useremail',  deleteItemss)//clear cart
router.get('/checkouts/:email', viewCheckoutsByEmail); //view orders


// Adding a route for product reorders that might trigger an email notification
router.post("/reorder", protect, reorderProduct);

module.exports = router;
