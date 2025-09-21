const Event = require("../models/eventModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

// Constants
const VALID_EVENT_CATEGORIES = [
  "Workshop",
  "Conference",
  "Hackathon",
  "Meetup",
  "Training",
  "Webinar",
  "Other",
];

const VALID_EVENT_TYPES = ["Physical", "Virtual", "Hybrid"];

const MIN_EVENT_NAME_LENGTH = 3;
const MAX_EVENT_NAME_LENGTH = 100;
const MAX_VENUE_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 1000;

/**
 * Validates event creation/update input
 * @param {Object} reqBody - Request body
 * @param {boolean} isUpdate - Whether this is an update operation
 * @throws {Error} If validation fails
 */
const validateEventInput = (reqBody, isUpdate = false) => {
  const {
    eventName,
    eventCategory,
    eventType,
    startDate,
    endDate,
    duration,
    eventRegLink,
    eventVenue,
    eventDescription,
    maxParticipants,
    currentParticipants,
  } = reqBody;

  // Check required fields for creation
  if (!isUpdate) {
    const requiredFields = {
      eventName,
      eventCategory,
      eventType,
      startDate,
      duration,
      eventRegLink,
      eventVenue,
      eventDescription,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(
        ([key, value]) => !value || (typeof value === "string" && !value.trim())
      )
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
  }

  // Validate event name
  if (eventName !== undefined) {
    if (
      typeof eventName !== "string" ||
      eventName.trim().length < MIN_EVENT_NAME_LENGTH
    ) {
      throw new Error(
        `Event name must be at least ${MIN_EVENT_NAME_LENGTH} characters long`
      );
    }
    if (eventName.trim().length > MAX_EVENT_NAME_LENGTH) {
      throw new Error(
        `Event name cannot exceed ${MAX_EVENT_NAME_LENGTH} characters`
      );
    }
  }

  // Validate event category
  if (eventCategory !== undefined) {
    if (!VALID_EVENT_CATEGORIES.includes(eventCategory)) {
      throw new Error(
        `Invalid event category. Must be one of: ${VALID_EVENT_CATEGORIES.join(
          ", "
        )}`
      );
    }
  }

  // Validate event type
  if (eventType !== undefined) {
    if (!VALID_EVENT_TYPES.includes(eventType)) {
      throw new Error(
        `Invalid event type. Must be one of: ${VALID_EVENT_TYPES.join(", ")}`
      );
    }
  }

  // Validate dates
  if (startDate !== undefined) {
    const startDateObj = new Date(startDate);
    if (isNaN(startDateObj.getTime())) {
      throw new Error("Invalid start date format");
    }
    if (startDateObj <= new Date()) {
      throw new Error("Start date must be in the future");
    }
  }

  if (endDate !== undefined) {
    const endDateObj = new Date(endDate);
    if (isNaN(endDateObj.getTime())) {
      throw new Error("Invalid end date format");
    }
    if (startDate && endDateObj <= new Date(startDate)) {
      throw new Error("End date must be after start date");
    }
  }

  // Validate registration link
  if (eventRegLink !== undefined) {
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(eventRegLink)) {
      throw new Error("Invalid registration link format. Must be a valid URL");
    }
  }

  // Validate venue
  if (eventVenue !== undefined) {
    if (
      typeof eventVenue === "string" &&
      eventVenue.trim().length > MAX_VENUE_LENGTH
    ) {
      throw new Error(`Venue cannot exceed ${MAX_VENUE_LENGTH} characters`);
    }
  }

  // Validate description
  if (eventDescription !== undefined) {
    if (
      typeof eventDescription === "string" &&
      eventDescription.trim().length > MAX_DESCRIPTION_LENGTH
    ) {
      throw new Error(
        `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`
      );
    }
  }

  // Validate participants
  if (maxParticipants !== undefined) {
    const max = parseInt(maxParticipants);
    if (isNaN(max) || max < 1) {
      throw new Error("Maximum participants must be a positive number");
    }
  }

  if (currentParticipants !== undefined) {
    const current = parseInt(currentParticipants);
    if (isNaN(current) || current < 0) {
      throw new Error("Current participants must be a non-negative number");
    }
  }
};

/**
 * Validates event ID parameter
 * @param {string} eventId - Event ID
 * @throws {Error} If validation fails
 */
const validateEventId = (eventId) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  // Basic MongoDB ObjectId validation
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(eventId)) {
    throw new Error("Invalid event ID format");
  }
};

/**
 * @swagger
 * @route POST /api/v1/events/create-event
 * @desc Create a new event
 * @access Private
 */
const createNewEvent = asyncHandler(async (req, res) => {
  const {
    eventName,
    eventCategory,
    eventType,
    startDate,
    endDate,
    duration,
    eventRegLink,
    eventVenue,
    media,
    eventDescription,
    maxParticipants,
    currentParticipants,
  } = req.body;

  // Validate input
  validateEventInput(req.body, false);

  try {
    // Calculate endDate if not provided
    let calculatedEndDate = endDate;
    if (!endDate && startDate) {
      const start = new Date(startDate);
      // Default to 1 day duration if not specified
      calculatedEndDate = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    }

    const event = await Event.create({
      eventName: eventName.trim(),
      eventCategory,
      eventType,
      startDate: new Date(startDate),
      endDate: calculatedEndDate ? new Date(calculatedEndDate) : undefined,
      duration,
      eventRegLink: eventRegLink.trim(),
      eventVenue: eventVenue.trim(),
      eventDescription: eventDescription?.trim() || "",
      media: media?.trim() || "https://shorturl.at/K2L0Y",
      maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
      currentParticipants: currentParticipants
        ? parseInt(currentParticipants)
        : 0,
      isActive: true,
    });

    if (!event) {
      res.status(400);
      throw new Error("Failed to create event");
    }

    // Return event data (excluding sensitive information)
    const {
      _id,
      eventName: createdEventName,
      eventCategory: createdEventCategory,
      eventType: createdEventType,
      startDate: createdStartDate,
      endDate: createdEndDate,
      duration: createdDuration,
      eventRegLink: createdEventRegLink,
      eventVenue: createdEventVenue,
      eventDescription: createdEventDescription,
      media: createdMedia,
      isActive,
      createdAt,
    } = event;

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: {
        _id,
        eventName: createdEventName,
        eventCategory: createdEventCategory,
        eventType: createdEventType,
        startDate: createdStartDate,
        endDate: createdEndDate,
        duration: createdDuration,
        eventRegLink: createdEventRegLink,
        eventVenue: createdEventVenue,
        eventDescription: createdEventDescription,
        media: createdMedia,
        isActive,
        createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating event:", error);
    if (error.name === "ValidationError") {
      res.status(400);
      throw new Error(`Validation error: ${error.message}`);
    }
    res.status(500);
    throw new Error("Failed to create event. Please try again");
  }
});

/**
 * @swagger
 * @route GET /api/v1/events/get-all-events
 * @desc Get all events
 * @access Public
 */
const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const {
      category,
      type,
      isActive,
      limit = 50,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build query
    let query = {};

    if (category) {
      query.eventCategory = category;
    }

    if (type) {
      query.eventType = type;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const events = await Event.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .select("-__v");

    const totalEvents = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      count: events.length,
      totalEvents,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalEvents / parseInt(limit)),
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500);
    throw new Error("Failed to fetch events. Please try again");
  }
});

/**
 * @swagger
 * @route GET /api/v1/events/get-single-event/{eventId}
 * @desc Get a single event by ID
 * @access Public
 */
const getEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;

  // Validate event ID
  validateEventId(eventId);

  try {
    const event = await Event.findById(eventId).select("-__v");

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    if (
      error.message === "Event not found" ||
      error.message === "Invalid event ID format"
    ) {
      throw error;
    }
    res.status(500);
    throw new Error("Failed to fetch event. Please try again");
  }
});

/**
 * @swagger
 * @route PATCH /api/v1/events/update-event/{eventId}
 * @desc Update an event
 * @access Private
 */
const updateEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;

  // Validate event ID
  validateEventId(eventId);

  // Validate input
  validateEventInput(req.body, true);

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    // Update fields
    const updateFields = {};
    const allowedFields = [
      "eventName",
      "eventCategory",
      "eventType",
      "startDate",
      "endDate",
      "duration",
      "eventRegLink",
      "eventVenue",
      "media",
      "eventDescription",
      "maxParticipants",
      "currentParticipants",
      "isActive",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === "startDate" || field === "endDate") {
          updateFields[field] = new Date(req.body[field]);
        } else if (
          field === "maxParticipants" ||
          field === "currentParticipants"
        ) {
          updateFields[field] = parseInt(req.body[field]);
        } else if (field === "isActive") {
          updateFields[field] =
            req.body[field] === "true" || req.body[field] === true;
        } else if (typeof req.body[field] === "string") {
          updateFields[field] = req.body[field].trim();
        } else {
          updateFields[field] = req.body[field];
        }
      }
    });

    // Validate date relationship if both dates are being updated
    if (updateFields.startDate && updateFields.endDate) {
      if (updateFields.endDate <= updateFields.startDate) {
        res.status(400);
        throw new Error("End date must be after start date");
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateFields, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!updatedEvent) {
      res.status(404);
      throw new Error("Event not found");
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    if (
      error.message === "Event not found" ||
      error.message === "Invalid event ID format"
    ) {
      throw error;
    }
    if (error.name === "ValidationError") {
      res.status(400);
      throw new Error(`Validation error: ${error.message}`);
    }
    res.status(500);
    throw new Error("Failed to update event. Please try again");
  }
});

/**
 * @swagger
 * @route DELETE /api/v1/events/delete/{eventId}
 * @desc Delete an event
 * @access Private
 */
const deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;

  // Validate event ID
  validateEventId(eventId);

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: {
        id: eventId,
        eventName: event.eventName,
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    if (
      error.message === "Event not found" ||
      error.message === "Invalid event ID format"
    ) {
      throw error;
    }
    res.status(500);
    throw new Error("Failed to delete event. Please try again");
  }
});

/**
 * @swagger
 * @route GET /api/v1/events/past
 * @desc Get past events
 * @access Public
 */
const pastEvents = asyncHandler(async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const pastEvents = await Event.find({
      endDate: { $lt: new Date() },
      isActive: true,
    })
      .sort({ endDate: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select("-__v");

    const totalPastEvents = await Event.countDocuments({
      endDate: { $lt: new Date() },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: pastEvents.length,
      totalPastEvents,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPastEvents / parseInt(limit)),
      data: pastEvents,
    });
  } catch (error) {
    console.error("Error fetching past events:", error);
    res.status(500);
    throw new Error("Failed to fetch past events. Please try again");
  }
});

/**
 * @swagger
 * @route GET /api/v1/events/upcoming
 * @desc Get upcoming events
 * @access Public
 */
const upcomingEvents = asyncHandler(async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const upcomingEvents = await Event.find({
      startDate: { $gt: new Date() },
      isActive: true,
    })
      .sort({ startDate: 1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select("-__v");

    const totalUpcomingEvents = await Event.countDocuments({
      startDate: { $gt: new Date() },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: upcomingEvents.length,
      totalUpcomingEvents,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUpcomingEvents / parseInt(limit)),
      data: upcomingEvents,
    });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500);
    throw new Error("Failed to fetch upcoming events. Please try again");
  }
});
module.exports = {
  // Main controller functions
  createNewEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  pastEvents,
  upcomingEvents,

  // Validation functions
  validateEventInput,
  validateEventId,

  // Constants (for testing or external use)
  VALID_EVENT_CATEGORIES,
  VALID_EVENT_TYPES,
  MIN_EVENT_NAME_LENGTH,
  MAX_EVENT_NAME_LENGTH,
  MAX_VENUE_LENGTH,
  MAX_DESCRIPTION_LENGTH,
};
