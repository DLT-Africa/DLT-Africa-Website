const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^(\+234|234|0)?[789][01]\d{8}$/,
        "Please enter a valid Nigerian phone number",
      ],
    },
    interest: {
      type: String,
      trim: true,
      maxlength: [200, "Interest cannot exceed 200 characters"],
    },
    source: {
      type: String,
      trim: true,
      enum: {
        values: ["Website", "Social Media", "Referral", "Event", "Other"],
        message: "Please select a valid source",
      },
    },
    status: {
      type: String,
      default: "Pending",
      enum: {
        values: ["Pending", "Contacted", "Converted", "Not Interested"],
        message: "Please select a valid status",
      },
    },
    priority: {
      type: String,
      default: "Normal",
      enum: {
        values: ["Low", "Normal", "High", "VIP"],
        message: "Please select a valid priority",
      },
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
waitlistSchema.index({ email: 1 });
waitlistSchema.index({ status: 1 });
waitlistSchema.index({ priority: 1 });
waitlistSchema.index({ createdAt: -1 });

const Waitlist = mongoose.model("Waitlist", waitlistSchema);
module.exports = Waitlist;
