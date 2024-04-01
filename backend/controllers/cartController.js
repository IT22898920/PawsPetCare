const Cart = require("../models/Cart.model.js") ;
const Items = require("../models/productModel.js");
const CheckD = require("../models/Checkout.model.js");
// const { errorHandle } = require("../utils/error.js");



//after add to cart clicking data go to the cart database
   const Cartcrete = async (req, res, next) => {
    
  
    const { ItemId,Currentuser,ItemsN, price, quantity, image,  Description,  } = req.body;
  
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
      console.log(error);
    }
  };

  //Current userId eqaul data display in the cart
const getCartItem = async (req, res, next) => {
    try {
      const { useremail } = req.params; 
      console.log(useremail);
  
      const items = await Cart.find({ Currentuser: useremail }); 
      console.log(items);
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  
//   const checkoutitem = async (req, res, next) => {
// //after click the check out those data save the chekd database
// // const checkout = async (req, res) => {

//   try {
//     // Insert checkout details into the database
//     const savedCheckout = await insertCheckoutDetails(checkoutDetails);
//     res.status(201).json(savedCheckout); // Send a success response with the saved checkout details
//   } catch (error) {
//     console.error('Error inserting checkout details:', error);
//     res.status(500).json({ error: 'Failed to insert checkout details' }); // Send an error response if inserting checkout details fails
//   }
// };


//romove 1 items in the cart 
 const deleteItems = async (req, res, next) => {
  
  try {
    
    await Cart.findByIdAndDelete(req.params.itemsId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

//after checkout clear the cart 
const deleteItemss = async (req, res, next) => {
  try {
    const { useremail } = req.params;
    console.log(useremail);

    // Delete items associated with the specified user's email
    const deleted = await Cart.deleteMany({ Currentuser: useremail });
    
    if (deleted.deletedCount > 0) {
      // At least one item was deleted
      res.status(200).json({ message: "Items have been deleted successfully" });
    } else {
      // No items were deleted
      res.status(200).json({ message: "No items found to delete for the current user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};




//get checkout details and fetch the order page


const CheckOutcrete = async (req, res, next) => {
  const { Name, email, Address, PNumber, Currentuser, totalPrice } = req.body;

  try {
    // Create a new instance of the Checkout model with the received data
    const newCheckout = new CheckD({
      Name,
      email,
      Address,
      PNumber,
      Currentuser,
      totalPrice
    });

    // Save the new checkout instance to the database
    const savedCheckout = await newCheckout.save();

    res.status(201).json(savedCheckout); // Send a success response with the saved checkout details
  } catch (error) {
    console.error('Error inserting checkout details:', error);
    res.status(500).json({ error: 'Failed to insert checkout details' }); // Send an error response if inserting checkout details fails
  }
};

//view orders
const viewCheckoutsByEmail = async (req, res, next) => {
  const { email } = req.params;

  try {
    // Query the database for checkouts with the specified email
    const checkouts = await CheckD.find({ email });

    if (checkouts.length > 0) {
      // Send the checkouts as JSON response if found
      res.status(200).json(checkouts);
    } else {
      // Send a message if no checkouts found for the email
      res.status(404).json({ message: 'No checkouts found for the specified email' });
    }
  } catch (error) {
    console.error('Error retrieving checkouts:', error);
    res.status(500).json({ error: 'Failed to retrieve checkouts' }); // Send an error response if retrieval fails
  }
};



module.exports = {
  Cartcrete,
  getCartItem,
  CheckOutcrete,
  deleteItems,
  deleteItemss,
  viewCheckoutsByEmail
};









  



  
  
  