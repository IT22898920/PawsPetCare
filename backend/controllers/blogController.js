const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
    res.send("Blog created");
});

module.exports = {
    createBlog,
};