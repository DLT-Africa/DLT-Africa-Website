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
      skills,
      description,
    });

    await newRegistration.save();

    // Optimize skill updates
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

    sendEmail(mailOptions).catch((error) => {
      console.error("Error sending email:", error);
    });

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
