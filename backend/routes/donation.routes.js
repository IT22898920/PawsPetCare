let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();


let donationSchema = require("../Models/Pet_Donation");
//donation schema refer the database created in mongodb atlas

router.route("/create-donation").post(async (req, res, next) => { //create or insert operation on collection - donation
  await donationSchema
    .create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});


router.route("/").get(async (req, res, next) => { //select, fetch or display data from collection 'donations'
  await donationSchema
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});


router.route("/get-donation/:id").get(async (req, res, next) => { //display data on basis of id from collection 'donations'
  await donationSchema
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});


router.route("/update-donation/:id").put(async (req, res, next) => { //update data on basis of id from collection 'donations'
  await donationSchema
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then((result) => {
      console.log(result);
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.route("/delete-donation/:id").delete(async (req, res, next) => { //delete data on basis of id from collection 'donations'
  await donationSchema
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
