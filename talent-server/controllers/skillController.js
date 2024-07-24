const Skill = require("../models/skillModel");

const createSkills = async (req, res) => {
  try {
    const skills = await Skill.create({});
    res.status(201).json({ message: "Skills initialized", skills });
  } catch (error) {
    res.status(500).json({ message: "Error creating skills", error });
  }
};

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.findOne();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving skills", error });
  }
};

const updateSkill = async (req, res) => {
  const { skillType, userId, action } = req.body;

  try {
    const skill = await Skill.findOne();

    if (!skill) {
      return res.status(404).json({ message: "Skills document not found" });
    }

    if (!skill[skillType]) {
      return res.status(400).json({ message: "Invalid skill type" });
    }

    if (action === "add") {
      if (!skill[skillType].includes(userId)) {
        skill[skillType].push(userId);
      }
    } else if (action === "remove") {
      skill[skillType] = skill[skillType].filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await skill.save();
    res.status(200).json({ message: "Skill updated", skill });
  } catch (error) {
    res.status(500).json({ message: "Error updating skill", error });
  }
};

// Delete skill document
const deleteSkills = async (req, res) => {
  try {
    await Skill.deleteOne({});
    res.status(200).json({ message: "Skills document deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skills", error });
  }
};

module.exports = {
  createSkills,
  getSkills,
  updateSkill,
  deleteSkills,
};
