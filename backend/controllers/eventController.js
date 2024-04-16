const Event = require("../models/eventModel");
const asyncHandler = require("express-async-handler");

const createNewEvent = asyncHandler(async (req, res) => {
  const {
    image,
    eventName,
    eventCategory,
    startDate,
    duration,
    eventDescription,
    eventRegLink,
    eventVenue,
  } = req.body;

  if (
    !image ||
    !eventName ||
    !eventCategory ||
    !startDate ||
    !duration ||
    !eventDescription ||
    !eventRegLink ||
    !eventVenue
  ) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const eventExists = await Event.findOne({ eventRegLink });

  if (eventExists) {
    res.status(400);
    throw new Error("Event details already in use.");
  }

  const event = await Event.create({
    image,
    eventName,
    eventCategory,
    startDate,
    duration,
    eventDescription,
    eventRegLink,
    eventVenue,
  });

  if (event) {
    const {
      _id,
      image,
      eventName,
      eventCategory,
      startDate,
      duration,
      eventDescription,
      eventRegLink,
      eventVenue,
    } = event;

    res.status(201).json({
      _id,
      image,
      eventName,
      eventCategory,
      startDate,
      duration,
      eventDescription,
      eventRegLink,
      eventVenue,
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
  const event = await Team.findById(req.team._id);

  if (event) {
    const {
      _id,
      image,
      eventName,
      eventCategory,
      startDate,
      duration,
      eventDescription,
      eventRegLink,
      eventVenue,
    } = event;

    res.status(201).json({
      _id,
      image,
      eventName,
      eventCategory,
      startDate,
      duration,
      eventDescription,
      eventRegLink,
      eventVenue,
    });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
};

const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.event._id);

  if (event) {
    const {
      image,
      eventName,
      eventCategory,
      startDate,
      duration,
      eventDescription,
      eventRegLink,
      eventVenue,
    } = event;

    event.image = req.body.image || image;
    event.eventName = req.body.eventName || eventName;
    event.eventCategory = req.body.eventCategory || eventCategory;
    event.startDate = req.body.startDate || startDate;
    event.duration = req.body.duration || duration;
    event.eventDescription = req.body.eventDescription || eventDescription;
    event.eventRegLink = req.body.eventRegLink || eventRegLink;
    event.eventVenue = req.body.eventVenue || eventVenue;

    const updateEvent = await event.save();

    res.status(201).json({
      _id: updateEvent._id,
      image: updateEvent.image,
      eventName: updateEvent.eventName,
      eventCategory: updateEvent.eventCategory,
      startDate: updateEvent.startDate,
      duration: updateEvent.duration,
      eventDescription: updateEvent.eventDescription,
      eventRegLink: updateEvent.eventRegLink,
      eventVenue: updateEvent.eventVenue,
    });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await event.deleteOne();
  res.status(200).json({
    message: "Event deleted successfully",
  });
});

module.exports = {
  createNewEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
