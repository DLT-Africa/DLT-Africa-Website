const express = require("express");
const {
  getWaitlistStatus,
  updateWaitlistStatus,
} = require("../controllers/settingsController");
const router = express.Router();

// Get waitlist status (public)
router.get("/waitlist-status", getWaitlistStatus);

// Update waitlist status (admin only)
router.put("/waitlist-status", updateWaitlistStatus);

module.exports = router;
