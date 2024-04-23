const express = require("express");
const { createNewEvent, getAllEvents, getEvent, deleteEvent, updateEvent } = require("../controllers/eventController");
const router = express.Router();

router.post("/create-event", createNewEvent);
router.get("/get-all-events", getAllEvents);
router.get("/get-single-event", getEvent);
router.delete("/:id", deleteEvent);
router.patch("/update-event", updateEvent)

module.exports = router;
