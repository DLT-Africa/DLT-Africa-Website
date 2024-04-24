const Event = require("../models/eventModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

const createNewEvent = asyncHandler(async (req, res) => {
  const {
    eventName,
    eventCategory,
    eventType,
    startDate,
    duration,

    eventRegLink,
    eventVenue,
    media,
    eventDescription,
  } = req.body;

  if (
    !eventName ||
    !eventCategory ||
    !eventType ||
    !startDate ||
    !duration ||
    !eventRegLink ||
    !eventVenue ||
    !eventDescription ||
    !media
  ) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const event = await Event.create({
    eventName,
    eventCategory,
    eventType,
    startDate,
    duration,
    eventRegLink,
    eventVenue,
    media,
    eventDescription,
  });

  if (event) {
    const {
      _id,

      eventName,
      eventCategory,
      eventType,
      startDate,
      duration,

      eventRegLink,
      eventVenue,
      media,
      eventDescription,
    } = event;

    res.status(201).json({
      _id,
      eventName,
      eventCategory,
      eventType,
      startDate,
      duration,

      eventRegLink,
      eventVenue,
      media,
      eventDescription,
    });
  } else {
    res.status(400);
    throw new Error("Invalid event data provided, please confirm!");
  }
});

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort("-createdAt");
  if (!events) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(events);
});

const getEvent = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findById(eventId);

    if (event) {
      const {
        _id,
        eventName,
        eventCategory,
        eventType,
        startDate,
        duration,
        eventRegLink,
        eventVenue,
        media,
        eventDescription,
      } = event;

      res.status(200).json({
        _id,
        eventName,
        eventCategory,
        eventType,
        startDate,
        duration,
        eventRegLink,
        eventVenue,
        media,
        eventDescription,
      });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findById(eventId);

    if (event) {
      const {
        eventName,
        eventCategory,
        eventType,
        startDate,
        duration,
        eventRegLink,
        eventVenue,
        media,
        eventDescription
      } = event;

      event.eventName = req.body.eventName || eventName;
      event.eventCategory = req.body.eventCategory || eventCategory;
      event.eventType = req.body.eventType || eventType;
      event.startDate = req.body.startDate || startDate;
      event.duration = req.body.duration || duration;
      event.eventRegLink = req.body.eventRegLink || eventRegLink;
      event.eventVenue = req.body.eventVenue || eventVenue;
      event.media = req.body.media || media;
      event.eventDescription = req.body.eventDescription || eventDescription;

     

      const updatedEvent = await event.save();

      res.status(201).json({
        _id: updatedEvent._id,
        eventName: updatedEvent.eventName,
        eventCategory: updatedEvent.eventCategory,
        eventType: updatedEvent.eventType,
        startDate: updatedEvent.startDate,
        duration: updatedEvent.duration,
        eventRegLink: updatedEvent.eventRegLink,
        eventVenue: updatedEvent.eventVenue,
        eventDescription: updatedEvent.eventDescription,
        media: updatedEvent.media,
      });
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const event = Event.findById(eventId);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    await event.deleteOne();
    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  createNewEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
