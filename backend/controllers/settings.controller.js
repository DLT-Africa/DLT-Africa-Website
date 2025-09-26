const asyncHandler = require("express-async-handler");
const Settings = require("../models/settingsModel");

const getWaitlistStatus = asyncHandler(async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // If no settings exist, create default one
    if (!settings) {
      settings = await Settings.create({ waitlistActive: false });
    }

    res.status(200).json({
      waitlistActive: settings.waitlistActive,
      lastUpdated: settings.lastUpdated,
    });
  } catch (error) {
    console.error("Error fetching waitlist status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateWaitlistStatus = asyncHandler(async (req, res) => {
  try {
    const { waitlistActive } = req.body;

    if (typeof waitlistActive !== "boolean") {
      res.status(400);
      throw new Error("waitlistActive must be a boolean value");
    }

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({ waitlistActive });
    } else {
      settings.waitlistActive = waitlistActive;
      settings.lastUpdated = new Date();
      await settings.save();
    }

    res.status(200).json({
      message: `Waitlist ${
        waitlistActive ? "activated" : "deactivated"
      } successfully`,
      waitlistActive: settings.waitlistActive,
      lastUpdated: settings.lastUpdated,
    });
  } catch (error) {
    console.error("Error updating waitlist status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  getWaitlistStatus,
  updateWaitlistStatus,
};
