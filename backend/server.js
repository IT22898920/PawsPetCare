const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const userAdoptionRoutes = require("./routes/userAdoptionRoutes");
const eventRoute = require("./routes/eventRoute");
const petRoute = require("./routes/petRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const blogRoute = require("./routes/blogRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const checkoutRoutes = require('./routes/checkoutRoutes');
const admin = require("./routes/adminRoutes");
const adoptScheduleRoutes = require("./routes/adoptScheduleRoutes")

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



// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/useradoptions", userAdoptionRoutes);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);
app.use("/api/petAdoption",petRoute);
app.use("/api/events",eventRoute);
app.use("/api/Blog",blogRoute);
app.use('/api/checkouts', checkoutRoutes);
app.use("/api/v1/admin", admin);
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
app.use('/api/adopt-schedule', adoptScheduleRoutes);

// Error Middleware
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connection successful!"); 
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));


