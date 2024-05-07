const express = require("express");
const { 
    createProduct, 
    getProducts, 
    getProduct, 
    deleteProduct, 
    updateProduct,
    getcategory,
    getOutOfStockProducts,
    reorderProduct,
    AdminreorderProduct, 
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
router.delete('/deleteitems/:itemsId',  deleteItems)
router.delete('/deletCurretId/:useremail',  deleteItemss)
router.get('/checkouts/:email', viewCheckoutsByEmail); 


router.post("/reorder", protect, reorderProduct);
router.post("/adminreorder", protect, AdminreorderProduct);

module.exports = router;
