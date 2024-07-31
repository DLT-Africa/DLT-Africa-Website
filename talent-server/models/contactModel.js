const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    emailAddress: {
      type: String,
      required: true,
    },
    calendlyLink: {
      type: String,
      required: true,
    },
    companyName: { type: String, required: true },
  },
  { timestamps: true, minimize: false }
);

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
