const mongoose = require("mongoose");

const contactModel = mongoose.Schema({
  orgName: {
    type: String,
    required: true,
    trim: true,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const contacts = mongoose.model("Contact", contactModel);
module.exports = contacts;
