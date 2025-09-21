const mongoose = require("mongoose");

const corpersModel = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^(\+234|234|0)?[789][01]\d{8}$/,
        "Please enter a valid Nigerian phone number",
      ],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Please select a valid gender",
      },
    },
    stateOfOrigin: {
      type: String,
      required: [true, "State of origin is required"],
      trim: true,
    },
    corpId: {
      type: String,
      required: [true, "Corp ID is required"],
      trim: true,
      unique: true,
      uppercase: true,
    },
    courseSelected: {
      type: String,
      required: [true, "Course selection is required"],
      trim: true,
    },
    batchResumption: {
      type: String,
      required: [true, "Batch resumption is required"],
      trim: true,
    },
    stateCode: {
      type: String,
      required: [true, "State code is required"],
      trim: true,
      uppercase: true,
      minlength: [2, "State code must be at least 2 characters"],
      maxlength: [3, "State code cannot exceed 3 characters"],
    },
    status: {
      type: String,
      default: "Active",
      enum: {
        values: ["Active", "Inactive", "Completed", "Suspended"],
        message: "Please select a valid status",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Add indexes for better query performance
corpersModel.index({ email: 1 });
corpersModel.index({ corpId: 1 });
corpersModel.index({ stateCode: 1 });
corpersModel.index({ status: 1 });
corpersModel.index({ createdAt: -1 });

const corpers = mongoose.model("Corper", corpersModel);
module.exports = corpers;
