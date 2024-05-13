// routes/AdoptScheduleRoutes.js

const express = require("express");
const {
  Schedulcreate,
  getschedul,
  allgetSchedul,
  updateschedul,
  deleteSchedul,
  shipsend,
  checkScheduleAvailability  // Import the validation function
} = require("../controllers/AdoptScheduleController.js");

const router = express.Router();

router.post('/schcreate', checkScheduleAvailability, Schedulcreate);  // Include the middleware in the route
router.get('/schedul/:currentId', getschedul);
router.get('/schedull', allgetSchedul);
router.put('/updatee/:schedulId', updateschedul);
router.delete('/deletee/:scheduId', deleteSchedul);
router.post('/ship-email', shipsend);

module.exports = router;
