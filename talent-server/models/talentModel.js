const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    uploadResume: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    gitHubLink: {
      type: String,
      required: true,
    },
    bgImage: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100

    },
    role: {
      type: String,
      required: true,
    },
    // skills: { type: [String], required: true },
  },
  { timestamps: true, minimize: false }
);

const Talent = mongoose.model("Talent", talentSchema);
module.exports = Talent;
