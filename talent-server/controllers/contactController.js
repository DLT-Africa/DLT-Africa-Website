const Contact = require("../models/contactModel");
const Talent = require("../models/talentModel");
const { sendEmail } = require("../utils/index");

exports.createForm = async (req, res) => {
  try {
    const { emailAddress, calendlyLink, companyName, talentId } = req.body;

    if (!emailAddress || !companyName || !calendlyLink || !talentId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields."
      });
    }

    const selectedTalent = await Talent.findById(talentId);
    if (!selectedTalent) {
      return res.status(404).json({
        success: false,
        message: "Talent not found."
      });
    }

    const newForm = new Contact({
      emailAddress,
      calendlyLink,
      companyName,
    });

    await newForm.save();

    // Prepare email options
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAddress,
      subject: "Talent Contact Information",
      text: `Hello ${companyName},\n\nThank you for your interest in our talent pool. Here are the details of the talent you selected:\n\nName: ${selectedTalent.fullName}\nSkills: ${selectedTalent.skills.join(", ")}\n\nPlease, be informed that the selected talent has been notified and they will soon contact your company directly using your provided contact details.\n\nBest regards,\nDLT Africa Team`,
    };

    const talentMailOptions = {
      from: process.env.EMAIL_USER,
      to: "info@dltafrica.io",
      subject: "You have a new contact request",
      text: `Hello ${selectedTalent.fullName},\n\nA company has shown interest in you. Here are their details:\n\nCompany Name: ${companyName}\nEmail: ${emailAddress}\nCalendly Link: ${calendlyLink}\n\nPlease feel free to reach out to them for further discussions.\n\nBest regards,\nDLT Africa Team`,
    };

    // Send emails asynchronously
    await Promise.all([
      sendEmail(companyMailOptions),
      sendEmail(talentMailOptions)
    ]).catch(error => {
      console.error("Error sending emails:", error);
      // Log email errors, but don't let it affect the response
    });

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully and email sent",
      data: newForm,
    });

  } catch (error) {
    console.error("Error in createForm:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

