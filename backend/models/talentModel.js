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
    addImage: {
      type: String,
      required: true,
    },
    skills: { type: [String], required: true },
  },
  { timestamps: true, minimize: false }
);

const Talent = mongoose.model("Talent", talentSchema);
module.exports = Talent;
