const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
const sendEmail = require("../utils/sendEmail");

// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;
  
    //   Validation
    if (!name || !category || !quantity || !price || !description) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }
  
    // Handle Image upload
    let fileData = {};
    if (req.file) {
      // Save image to cloudinary
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Pinvent App",
          resource_type: "image",
        });
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ message: "Image could not be uploaded", error: error.message });
        return;
    }
      
  
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),// 2 is decimal
      };
    }
  
    // Create Product
    const product = await Product.create({
      user: req.user.id,
      name,
      sku,
      category,
      quantity,
      price,
      description,
      image: fileData,
    });
  
    res.status(201).json(product);
  });
    //////////////////////////
    const getcategory = asyncHandler(async (req, res) => {
      console.log('getcategory route hit'); // Add this to check if the route is being called
      const category = await Product.find({ user: req.user.id }).distinct('category');
      res.status(200).json(category);
    });
    
    
  /////////////////////////
// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("-createdAt"); // Fetch all products without filtering by user ID
  res.status(200).json(products);
});



// Get single product
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.status(200).json(product);
  });

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // if product doesn't exist
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    
    await Product.deleteOne({ _id: req.params.id });
    
    res.status(200).json({ message: "Product deleted." });
  });
  
  // Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, category, quantity, price, description } = req.body;
    const { id } = req.params;
  
    const product = await Product.findById(id);
  
    // if product doesnt exist
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
  
    // Handle Image upload
    let fileData = {};
    if (req.file) {
      // Save image to cloudinary
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Pinvent App",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Image could not be uploaded");
      }
  
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
  
    // Update Product
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        name,
        category,
        quantity,
        price,
        description,
        image: Object.keys(fileData).length === 0 ? product?.image : fileData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedProduct);

});

  // Get Out-of-Stock Products
  const getOutOfStockProducts = asyncHandler(async (req, res) => {
    try {
      console.log("User ID:", req.user.id); // Check the user ID
      const products = await Product.find({ user: req.user.id, quantity: { $lt: 4 } }).sort("-createdAt");
      console.log("Fetched products:", products); // Should output the fetched products
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching out-of-stock products:", error); // This will log any errors that occur
      res.status(500).json({ message: "An error occurred fetching out-of-stock products", error: error.message });
    }
  });
  
// Reorder product and send an email notification
const reorderProduct = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  // Find the product by ID
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
    // Update product quantity
    product.quantity = quantity; 
    await product.save(); 
});

const AdminreorderProduct = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  // Find the product by ID
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  // Construct the email message here
  const emailBody = `<p>The product <b>${product.name}</b> has been reordered. Quantity: ${quantity}.</p>`;

  try {
    
    await sendEmail(
      "Product Reorder Notification", 
      emailBody,                      
      "ravindupasanjith22@outlook.com", 
      process.env.EMAIL_USER,            
      "ravindupasanjith22@outlook.com"  
    );
    res.json({ message: "Reorder processed and email sent." });
  } catch (error) {
    console.error("Failed to send reorder email", error);
    res.status(500).json({ message: "Reorder processed, but email sending failed.", error: error.message });
  }
});



  module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    getcategory, 
    getOutOfStockProducts,
    reorderProduct, 
    AdminreorderProduct,
  };