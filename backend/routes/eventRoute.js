const express = require("express");
const {
  createNewEvent,
  getAllEvents,
  getEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");
const router = express.Router();

router.post("/create-event", createNewEvent);
router.get("/get-all-events", getAllEvents);
router.get("/get-single-event/:eventId", getEvent);
router.delete("/delete/:eventId", deleteEvent);
router.patch("/update-event/:eventId", updateEvent);

module.exports = router;
