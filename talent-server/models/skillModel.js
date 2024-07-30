const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  Blockchain: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talent" }],
  Frontend: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talent" }],
  Backend: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talent" }],
  Product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talent" }],
});

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
