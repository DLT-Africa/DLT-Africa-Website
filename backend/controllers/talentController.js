const { sendEmail } = require("../utils");
const Talent = require("../models/talentModel");

exports.register = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      emailAddress,
      uploadResume,
      gender,
      gitHubLink,
      addImage,
      role,
    } = req.body;

    const newRegistration = new Talent({
      fullName,
      phoneNumber,
      emailAddress,
      uploadResume,
      gender,
      gitHubLink,
      addImage,
      role,
    });

    await newRegistration.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAddress,
      subject: "Registration Successful",
      text: `Hello ${fullName},\n\nThank you for registering for the DLT Africa talent pool.\n\nBest regards,\nDLT Africa Team`,
    };

    await sendEmail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: newRegistration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
