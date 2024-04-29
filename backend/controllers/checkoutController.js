const Checkout = require('../models/Checkout.model');

// Controller function to retrieve all checkouts
const getAllCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.json(checkouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to retrieve a single checkout by ID
const getCheckoutById = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: 'Checkout not found' });
    }
    res.json(checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a checkout by ID
const updateCheckoutById = async (req, res) => {
  try {
    const { totalPrice, Name, email, Address, PNumber, Currentuser, Status } = req.body;
    const checkout = await Checkout.findByIdAndUpdate(
      req.params.id,
      { totalPrice, Name, email, Address, PNumber, Currentuser, Status },
      { new: true }
    );
    if (!checkout) {
      return res.status(404).json({ message: 'Checkout not found' });
    }
    res.json(checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCheckouts,
  getCheckoutById,
  updateCheckoutById
};
