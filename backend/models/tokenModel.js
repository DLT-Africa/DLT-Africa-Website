const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "Team", // Updated to reference Team model
    },
    vToken: {
      type: String,
      default: "",
      trim: true,
    },
    rToken: {
      type: String,
      default: "",
      trim: true,
    },
    lToken: {
      type: String,
      default: "",
      trim: true,
    },
    tokenType: {
      type: String,
      required: [true, "Token type is required"],
      enum: {
        values: ["verification", "reset", "login", "refresh"],
        message: "Please select a valid token type",
      },
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      required: [true, "Created date is required"],
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration date is required"],
      index: { expireAfterSeconds: 0 }, // TTL index for automatic cleanup
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Add indexes for better query performance
tokenSchema.index({ userId: 1 });
tokenSchema.index({ tokenType: 1 });
tokenSchema.index({ isUsed: 1 });
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
