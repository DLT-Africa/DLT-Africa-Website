const express = require("express");
const { register, getTalents, getTalent } = require("../controllers/talentController");
const router = express.Router();

router.post("/register", register);

router.get("/talents", getTalents);

router.get("/talent/:id", getTalent);

module.exports = router;
