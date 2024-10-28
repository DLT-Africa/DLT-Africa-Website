const express = require("express");
const { register, getTalents, getTalent, updateTalent, deleteTalent } = require("../controllers/talentController");
const router = express.Router();

router.post("/register", register);

router.get("/talents", getTalents);

router.get("/talent/:id", getTalent);

router.put('/:talentId', updateTalent);

router.delete('/:talentId', deleteTalent);


module.exports = router;
