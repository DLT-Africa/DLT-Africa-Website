const Contact = require("../models/contactModel");
const Talent = require("../models/talentModel");
const { sendEmail } = require("../utils/index");

exports.createForm = async (req, res) => {
  const { emailAddress, calendlyLink, companyName, talentId } = req.body;

  if (!emailAddress || !companyName || !calendlyLink || !talentId) {
    res.status(400);
    throw new Error("Please fill all the fields.");
  }

  const selectedTalent = await Talent.findById(talentId);
  if (!selectedTalent) {
    res.status(404);
    throw new Error("Talent not found.");
  }

  const newForm = new Contact({
    emailAddress,
    calendlyLink,
    companyName,
  });

  await newForm.save();

  if (newForm) {
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAddress,
      subject: "Talent Contact Information",
      text: `Hello ${companyName},\n\nThank you for your interest in our talent pool. Here are the details of the talent you selected:\n\nName: ${
        selectedTalent.fullName
      }\nSkills: ${selectedTalent.skills.join(
        ", "
      )}\n\nPlease, be informed that the selected talent has been notified and they will soon contact your company directly using your provided contact details.\n\nBest regards,\nDLT Africa Team`,
    };

    await sendEmail(companyMailOptions);

    const talentMailOptions = {
      from: process.env.EMAIL_USER,
      to: "info@dltafrica.io",
      subject: "You have a new contact request",
      text: `Hello ${selectedTalent.fullName},\n\nA company has shown interest in you. Here are their details:\n\nCompany Name: ${companyName}\nEmail: ${emailAddress}\nCalendly Link: ${calendlyLink}\n\nPlease feel free to reach out to them for further discussions.\n\nBest regards,\nDLT Africa Team`,
    };

    await sendEmail(talentMailOptions);

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully and email sent",
      data: newForm,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
