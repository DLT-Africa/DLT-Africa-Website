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
    //Bootcamp, Incubator,
  },
  startDate: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  eventDescription: {
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
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
