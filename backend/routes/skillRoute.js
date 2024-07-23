const express = require("express");
const router = express.Router();
const {
  createSkills,
  getSkills,
  updateSkill,
  deleteSkills,
} = require("../controllers/skillController");

// Create initial skills (one-time setup)
router.post("/create", createSkills);

// Get all skills
router.get("/skills", getSkills);

// Update a skill (add or remove user ID)
router.put("/skills/update", updateSkill);

// Delete all skills
router.delete("/skills", deleteSkills);

module.exports = router;
