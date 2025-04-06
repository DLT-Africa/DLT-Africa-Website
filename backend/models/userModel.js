const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },

  academicQualification: {
    type: String,
    required: true,
  },

  courseSelected: {
    type: String,
    required: true,
  },

  classType: {
    type: String,
    required: true,
  },

  stateOfOrigin: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  phoneNo: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },

  codeExperience: {
    type: String,
    required: true,
  },

  stateOfResidence: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Not Paid",
  },
  referralOption: {
    type: String,
  },
  referralName: {
    type: String,
  }
});

const CohortSev = mongoose.model("CohortSeven", cohortSchema);
module.exports = CohortSev;
