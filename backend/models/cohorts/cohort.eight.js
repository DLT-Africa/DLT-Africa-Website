const mongoose = require("mongoose");
const CohortSev = require("../userModel");

const cohortEightSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

cohortEightSchema.add(CohortSev.schema.obj);

cohortEightSchema.index({ emailAddress: 1 });
cohortEightSchema.index({ status: 1 });
cohortEightSchema.index({ courseSelected: 1 });
cohortEightSchema.index({ createdAt: -1 });

const CohortEight = mongoose.model("CohortEight", cohortEightSchema);
module.exports = CohortEight;
