const Cart = require("../models/Cart.model.js");
const Product = require("../models/productModel.js");
const CheckD = require("../models/Checkout.model.js");

const Cartcrete = async (req, res, next) => {
  const { ItemId, Currentuser, ItemsN, price, quantity, image, Description } = req.body;
  const newItems = new Cart({
    ItemId,
    Currentuser,
    ItemsN,
    price,
    quantity,
    image,
    Description,
  });
  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.error(error);
  }
};

const getCartItem = async (req, res, next) => {
  try {
    const { useremail } = req.params;
    const items = await Cart.find({ Currentuser: useremail });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteItems = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.itemsId);
    res.status(200).json({ message: "The item has been deleted" });
  } catch (error) {
    next(error);
  }
};

const deleteItemss = async (req, res, next) => {
  try {
    const { useremail } = req.params;
    const deleted = await Cart.deleteMany({ Currentuser: useremail });

    if (deleted.deletedCount > 0) {
      res.status(200).json({ message: "Items have been deleted successfully" });
    } else {
      res.status(200).json({ message: "No items found to delete for the current user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const CheckOutcrete = async (req, res, next) => {
  const { Name, email, Address, PNumber, Currentuser, totalPrice, Status, items } = req.body;
  try {
    for (const item of items) {
      const product = await Product.findById(item.ItemId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.ItemId} not found` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for product ${product.name}. Available: ${product.quantity}, requested: ${item.quantity}` });
      }
    }

    const newCheckout = new CheckD({
      Name,
      email,
      Address,
      PNumber,
      Currentuser,
      totalPrice,
      Status,
    });

    await newCheckout.save();

    for (const item of items) {
      const product = await Product.findById(item.ItemId);
      product.quantity -= item.quantity;
      await product.save();
    }
    await Cart.deleteMany({ Currentuser: email });

    res.status(201).json({ message: "Checkout successful", checkoutId: newCheckout._id });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ error: error.message || 'Failed to process checkout' });
  }
};

const viewCheckoutsByEmail = async (req, res, next) => {
  const { email } = req.params;

  try {
    const checkouts = await CheckD.find({ email });
    if (checkouts.length > 0) {
      res.status(200).json(checkouts);
    } else {
      res.status(404).json({ message: 'No checkouts found for the specified email' });
    }
  } catch (error) {
    console.error('Error retrieving checkouts:', error);
    res.status(500).json({ error: 'Failed to retrieve checkouts' });
  }
};

const CheckOutupdate = async (req, res, next) => {
  const { checkoutId } = req.params;
  const { Name, email, Address, PNumber, Currentuser, totalPrice, Status } = req.body;
  
  try {
    const updatedCheckout = await CheckD.findByIdAndUpdate(
      checkoutId,
      {
        Name,
        email,
        Address,
        PNumber,
        Currentuser,
        totalPrice,
        Status
      },
      { new: true }
    );

    if (!updatedCheckout) {
      return res.status(404).json({ message: 'Checkout not found' });
    }

    res.status(200).json({ message: 'Checkout updated successfully', updatedCheckout });
  } catch (error) {
    console.error('Error updating checkout:', error);
    res.status(500).json({ error: 'Failed to update checkout' });
  }
};

const getAllCheckouts = async (req, res, next) => {
  try {
    const checkouts = await CheckD.find();
    res.status(200).json(checkouts);
  } catch (error) {
    console.error('Error retrieving checkouts:', error);
    res.status(500).json({ error: 'Failed to retrieve checkouts' });
  }
};

module.exports = {
  Cartcrete,
  getCartItem,
  CheckOutcrete,
  deleteItems,
  deleteItemss,
  viewCheckoutsByEmail,
  CheckOutupdate,
  getAllCheckouts,
};
