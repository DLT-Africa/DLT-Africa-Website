const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventCategory: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    default: "Hackathon",
  },
  startDate: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },

  eventRegLink: {
    type: String,
    required: true,
  },
  eventVenue: {
    type: String,
    required: true,
  },

  media: {
    type: String,
    default: "https://shorturl.at/K2L0Y",
  },
  eventDescription: {
    type: String,
    default: "",
  },
});

eventSchema.virtual("isUpcoming").get(function () {
  return this.date > Date.now();
});

eventSchema.virtual("isPast").get(function () {
  return this.date <= Date.now();
});
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
