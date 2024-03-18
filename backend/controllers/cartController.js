const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

// Add item to cart
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming user ID comes from authentication middleware

  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    // Check if product already exists in cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      // Product exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Product doesn't exist, add new item
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.status(201).json(cart);
  } else {
    // No cart for user, create new cart
    const newCart = await Cart.create({
      user: userId,
      items: [{ product: productId, quantity }],
    });
    res.status(201).json(newCart);
  }
});

// Other cart operations like updateItem, removeItem can be added here
