const express = require("express");
const { Schedulcreate,  allgetSchedul,  deleteSchedul,   getschedul,  shipsend,   updateschedul} = require("../controllers/AdoptScheduleController.js");

const router = express.Router();

router.post('/schcreate', Schedulcreate);
router.get('/schedul/:currentId', getschedul);
router.get('/schedull', allgetSchedul);
router.put( '/updatee/:schedulId', updateschedul);
router.delete('/deletee/:scheduId',  deleteSchedul);
router.post('/ship-email', shipsend);


module.exports = router;