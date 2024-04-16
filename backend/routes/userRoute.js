const express = require("express");
const {
  registerUser,
  getAdmissions,
  deleteAdmission,
  upgradeData,
} = require("../controllers/userController");
const router = express.Router();

router.post("/studentreg", registerUser);
router.get("/get-all-admissions", getAdmissions);
router.delete("/:id", deleteAdmission);
router.post("/upgrade-admission", upgradeData);

module.exports = router;
