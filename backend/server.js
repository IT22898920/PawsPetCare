const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");
const petRoute = require("./routes/petRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const blogRoute = require("./routes/blogRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);
app.use("/api/petAdoption",petRoute);
app.use("/api/events",eventRoute);
app.use("/api/Blog",blogRoute);

// Error Middleware
app.use(errorHandler);
// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

