const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Routes
router.get('/', checkoutController.getAllCheckouts);
router.get('/:id', checkoutController.getCheckoutById);
router.put('/:id', checkoutController.updateCheckoutById);

module.exports = router;