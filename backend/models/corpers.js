const mongoose = require("mongoose");
const corpersModel = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  stateOfOrigin: {
    type: String,
    required: true,
  },
  corp_id: {
    type: String,
    required: true,
  },
  course_selected: {
    type: String,
    required: true,
  },
  batchResumption: {
    type: String,
    required: true,
  },
});

const corpers = mongoose.model("Corper", corpersModel);
module.exports = corpers;
