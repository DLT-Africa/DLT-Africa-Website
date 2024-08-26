const express = require("express");
const {
  createNewEvent,
  getAllEvents,
  getEvent,
  deleteEvent,
  updateEvent,
  pastEvents,
  upcomingEvents,
} = require("../controllers/eventController");
const router = express.Router();

router.post("/create-event", createNewEvent);
router.get("/get-all-events", getAllEvents);
router.get("/upcoming", upcomingEvents);
router.get("/past", pastEvents);
router.get("/get-single-event/:eventId", getEvent);
router.delete("/delete/:eventId", deleteEvent);
router.patch("/update-event/:eventId", updateEvent);

module.exports = router;
