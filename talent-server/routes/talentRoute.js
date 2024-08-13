const express = require("express");
const { register, getTalents, getTalent, updateTalent } = require("../controllers/talentController");
const router = express.Router();

router.post("/register", register);

router.get("/talents", getTalents);

router.get("/talent/:id", getTalent);

router.put('/:talentId', updateTalent);


module.exports = router;
