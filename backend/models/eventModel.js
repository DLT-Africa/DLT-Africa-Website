const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventCategory: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventRegLink: {
        type: String,
        required: true
    },
    eventVenue: {
        type: String,
        required: true
    }
})


const Event = mongoose.model("Event", eventSchema)
module.exports = Event