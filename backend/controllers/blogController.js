const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const { fileSizeFormatter } = require("../utils/fileUpload");
const Blog = require("../models/blogModel");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  // validation
  if (!title || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    try {
      const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "pinvent App",
        resource_type: "image",
      });
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2), // 2 is decimal
      };
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
  }

  // Create blog
  const blog = await Blog.create({
    user: req.user.id,
    title,
    description,
    image: fileData,
  });

  res.status(201).json(blog);
});

const getblogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ }).sort("-createdAt");
  res.status(200).json(blogs);
});

const getblog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(blog);
});


//delete blog
const deleteblog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  // Find and delete the blog
  const blog = await Blog.findById(blogId);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  // Check if the user is authorized to delete the blog
  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
// Remove the blog from the database 
await blog.deleteOne({ _id: req.params.id }); 
  res.status(200).json({ message: "Blog deleted successfully" });
});



//update blog


const updatedblog = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;
  
    try {
      // Find the blog by ID
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      // Check if the user is authorized to update the blog
      if (blog.user.toString() !== req.user.id) {
        return res.status(401).json({ message: "User not authorized" });
      }
  
      // Handle Image upload
      let fileData = {};
      if (req.file) {
        // Save image to cloudinary
        const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "pinvent App",
          resource_type: "image"
        });
  
        fileData = {
          fileName: req.file.originalname,
          filePath: uploadedFile.secure_url,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2) // 2 decimal places
        };
      }
  
      // Update the blog with new data
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        {
          title,
          description,
          image: Object.keys(fileData).length > 0 ? fileData : blog.image,
        },
        { new: true, runValidators: true }
      );
  
      // Send the updated blog as the response
      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating blog" });
    }
  });

module.exports = {
  createBlog,
  getblogs,
  getblog,
  deleteblog,
  updatedblog,
};
