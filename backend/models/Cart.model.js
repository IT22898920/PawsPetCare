const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  Currentuser: {
    type: String,
    required: true
  },
  ItemId: {
    type: String,
    // required: true
  },
  ItemsN: {
    type: String,
    // required: true
  },
  price: {
    type: Number, 
    // required: true
  },
  quantity: {
    type: Number, 
    // required: true
  },
  image: {
    type: Object,
    default: {},
  },
  Description: {
    type: String,
    // required: true
  }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
