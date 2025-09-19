const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    waitlistActive: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);
module.exports = Settings;
