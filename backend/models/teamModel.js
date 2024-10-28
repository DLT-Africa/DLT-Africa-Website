const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const validEmails = [
  "naheem@dltafrica.io",
  "aliyuanate016@gmail.com",
  "soliuahmad99@gmail.com",
  "oluwaseyi@dltafrica.io",
  "rajiabdullahi907@outlook.com",
];

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
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
    enum: {
      values: validEmails,
      message: "Email is not allowed",
    },
  },
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

teamSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
