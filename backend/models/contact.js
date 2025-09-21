const mongoose = require("mongoose");

const contactModel = mongoose.Schema(
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
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^(\+234|234|0)?[789][01]\d{8}$/,
        "Please enter a valid Nigerian phone number",
      ],
    },
    status: {
      type: String,
      default: "New",
      enum: {
        values: ["New", "Read", "Replied", "Closed"],
        message: "Please select a valid status",
      },
    },
    priority: {
      type: String,
      default: "Medium",
      enum: {
        values: ["Low", "Medium", "High", "Urgent"],
        message: "Please select a valid priority",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Add indexes for better query performance
contactModel.index({ email: 1 });
contactModel.index({ status: 1 });
contactModel.index({ createdAt: -1 });

const contacts = mongoose.model("Contact", contactModel);
module.exports = contacts;
