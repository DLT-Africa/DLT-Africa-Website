const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  blockchain: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talent" }],
  frontend: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talent" }],
  fullstack: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talent" }],
  productDesign: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talent" }],
});

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
