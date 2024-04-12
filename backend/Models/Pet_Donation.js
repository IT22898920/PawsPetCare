const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let donationSchema = new Schema({
//name of fields with data type created inside donation table or collection

  first_name: {
    type: String
  },
  
  last_name: {
    type: String
  },
  contact_no:{
    type: Number
  },
  email: {
    type: String
  },
  amount: {
    type: Number
  },
  payment_mode: {
    type: String
  },
  address: {
    type: String
  }
  
}, {
    collection: 'donations'//collection name in mongodb atlas inside database 'test'
  })

module.exports = mongoose.model('Donation', donationSchema)