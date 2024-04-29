const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  PNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  Currentuser: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  },

}, { timestamps: true });

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
