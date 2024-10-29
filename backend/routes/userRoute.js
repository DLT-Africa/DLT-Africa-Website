const express = require("express");
const {
  registerUser,
  getAdmissions,
  deleteAdmission,
  upgradeData,
  corpersReg,
  getCorpers,
} = require("../controllers/userController");
const router = express.Router();

router.post("/studentreg", registerUser);
router.post("/corperreg", corpersReg);
router.post("/upgrade-admission", upgradeData);

router.get("/get-all-admissions", getAdmissions);
router.get("/get-all-corpers", getCorpers);
router.delete("/:id", deleteAdmission);

module.exports = router;
