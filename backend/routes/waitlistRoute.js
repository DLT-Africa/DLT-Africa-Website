const express = require("express");
const {
  joinWaitlist,
  getWaitlist,
  deleteWaitlistEntry,
} = require("../controllers/waitlistController");
const router = express.Router();

// Join waitlist
router.post("/join", joinWaitlist);

// Get all waitlist entries (admin)
router.get("/", getWaitlist);

// Delete waitlist entry (admin)
router.delete("/:id", deleteWaitlistEntry);

module.exports = router;
