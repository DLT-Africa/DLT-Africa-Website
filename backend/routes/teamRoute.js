const express = require("express");
const {
  createTeam,
  loginTeam,
  logout,
  getSingleTeam,
  deleteTeam,
  getAllTeam,
  loginStatus,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyTeam,
  forgotPassword,
  updateTeam,
  resetPassword,
  changePassword,
} = require("../controllers/teamController");
const router = express.Router();

router.post("/register-team", createTeam);
router.post("/login", loginTeam);

router.get("/logout", logout);
router.get("/get-single-team", getSingleTeam);
router.patch("/update-team-details", updateTeam);

router.delete("/:id", deleteTeam);
router.get("/team-details", getAllTeam);
router.get("/loginStatus", loginStatus);
router.post("/sendAutomatedEmail", sendAutomatedEmail);

router.post("/sendVerificationEmail", sendVerificationEmail);
router.patch("/verifyUser/:verificationToken", verifyTeam);
router.post("/forgotPassword", forgotPassword);

router.patch("/resetPassword/:resetToken", resetPassword);
router.patch("/changePassword", changePassword);

module.exports = router;
