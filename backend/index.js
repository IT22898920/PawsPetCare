let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");

// Express Route
const donationRoute = require("./routes/donation.routes"); //import donation.route file

// Connecting mongoDB Database
mongoose
  .connect("mongodb+srv://rashel4gunarathne:f3jIu0S9cplrdvET@cluster0.jmxlhrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0") //create the connection with database
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use("/donations", donationRoute); //data coming from the frontend by url / donation 
                                      //this url call donation.route.js url like createdonation, updatedonation etc..

// PORT
const port = process.env.PORT || 4000; //url port number earlier 4000
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
