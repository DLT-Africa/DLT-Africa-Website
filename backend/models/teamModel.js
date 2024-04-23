const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  // password: {
  //   type: String,
  //   required: [true, "Please add a password"],
  // },
  phone: {
    type: String,
    default: "+234 812345678",
  },
  role: {
    type: String,
    required: true,
    default: "admin",
  },
  photo: {
    type: String,
    required: true,
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
