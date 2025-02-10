const { sendEmail } = require("../utils/index");
const Talent = require("../models/talentModel");
const Skill = require("../models/skillModel");

exports.register = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      emailAddress,
      uploadResume,
      gender,
      gitHubLink,
      bgImage,
      role,
      skills,
      description,
      profileImage,
    } = req.body;

    const existingTalent = await Talent.findOne({ emailAddress });
    if (existingTalent) {
      return res.status(400).json({
        success: false,
        message: "Talent already exists with this email address.",
      });
    }

    if (description.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Description must not exceed 100 characters.",
      });
    }

    const newRegistration = new Talent({
      fullName,
      phoneNumber,
      emailAddress,
      uploadResume,
      gender,
      gitHubLink,
      bgImage,
      role,
      profileImage,
      // skills,
      description,
    });

    await newRegistration.save();

    const skillsToUpdate = {};
    await Promise.all(
      skills.map(async (skillType) => {
        if (!skillsToUpdate[skillType]) {
          skillsToUpdate[skillType] = [];
        }
        skillsToUpdate[skillType].push(newRegistration._id);
      })
    );

    await Promise.all(
      Object.keys(skillsToUpdate).map(async (skillType) => {
        const skill = await Skill.findOne({ skillType });
        if (skill) {
          skillsToUpdate[skillType].forEach((id) => {
            if (!skill[skillType].includes(id)) {
              skill[skillType].push(id);
            }
          });
          await skill.save();
        }
      })
    );

    // Send email asynchronously

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAddress,
      subject: "Registration Successful",
      text: `Hello ${fullName},\n\nThank you for registering for the DLT Africa talent pool.\n\nBest regards,\nDLT Africa Team`,
    };

    const notifyOptions = {
      from: process.env.EMAIL_USER,
      to: "info@dltafrica.io",
      subject: "New Talent Registration",
      text: `A new talent has registered:\n\nName: ${fullName}\nEmail: ${emailAddress}\nRole: ${role}\n\nPlease review the details in the talent management system.`,
    };

    await Promise.all([
      sendEmail(mailOptions).catch((error) =>
        console.error("Error sending registration email:", error)
      ),
      sendEmail(notifyOptions).catch((error) =>
        console.error("Error sending notification email:", error)
      ),
    ]);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: newRegistration,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getTalent = async (req, res) => {
  try {
    const { id } = req.params;

    const talent = await Talent.findById(id);

    if (!talent) {
      return res.status(404).json({
        success: false,
        message: "Talent not found",
      });
    }

    res.status(200).json({
      success: true,
      data: talent,
    });
  } catch (error) {
    console.error("Error fetching talent:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getTalents = async (req, res) => {
  try {
    const { skills } = req.query;

    let query = {};

    if (skills) {
      const skillArray = skills.split(",").map((skill) => skill.trim());

      if (Array.isArray(skillArray) && skillArray.length > 0) {
        query.skills = { $all: skillArray };
      }
    }

    const talents = await Talent.find(query);

    if (talents.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No talents found with the specified skill sets",
      });
    }

    res.status(200).json({
      success: true,
      data: talents,
    });
  } catch (error) {
    console.error("Error fetching talents by skill sets:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.updateTalent = async (req, res) => {
  try {
    const { talentId } = req.params;
    const {
      fullName,
      phoneNumber,
      emailAddress,
      uploadResume,
      gender,
      gitHubLink,
      bgImage,
      role,
      skills,
      description,
      profileImage,
    } = req.body;

    // Find the talent by ID
    const talent = await Talent.findById(talentId);
    if (!talent) {
      return res.status(404).json({
        success: false,
        message: "Talent not found.",
      });
    }

    // Validate description length
    if (description && description.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Description must not exceed 100 characters.",
      });
    }

    // Update talent details
    talent.fullName = fullName || talent.fullName;
    talent.phoneNumber = phoneNumber || talent.phoneNumber;
    talent.emailAddress = emailAddress || talent.emailAddress;
    talent.uploadResume = uploadResume || talent.uploadResume;
    talent.gender = gender || talent.gender;
    talent.gitHubLink = gitHubLink || talent.gitHubLink;
    talent.bgImage = bgImage || talent.bgImage;
    talent.role = role || talent.role;
    talent.skills = skills || talent.skills;
    talent.description = description || talent.description;
    talent.profileImage = profileImage || talent.profileImage;

    // Save the updated talent
    await talent.save();

    res.status(200).json({
      success: true,
      message: "Talent updated successfully.",
      data: talent,
    });
  } catch (error) {
    console.error("Update talent error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteTalent = async (req, res) => {
  const { talentId } = req.params;
  const talent = await Talent.findById(talentId);
  if (!talent) {
    return res.status(404).json({
      success: false,
      message: "Talent not found.",
    });
  }

  await talent.deleteOne();
  res.status(200).json({
    message: "Data deleted successfully",
  });
};
