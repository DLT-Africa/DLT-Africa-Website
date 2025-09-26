const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

// Constants
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 200;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_PHONE_LENGTH = 20;

const VALID_PRIORITIES = ["Low", "Medium", "High", "Urgent"];
const VALID_STATUSES = ["New", "Read", "Replied", "Closed"];

/**
 * Validates contact form input
 * @param {Object} reqBody - Request body
 * @param {boolean} isUpdate - Whether this is an update operation
 * @throws {Error} If validation fails
 */
const validateContactInput = (reqBody, isUpdate = false) => {
  const { name, email, message, subject, phone, priority, status } = reqBody;

  // Check required fields for creation
  if (!isUpdate) {
    const requiredFields = { name, email, message };
    const missingFields = Object.entries(requiredFields)
      .filter(
        ([key, value]) => !value || (typeof value === "string" && !value.trim())
      )
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
  }

  // Validate name
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length < MIN_NAME_LENGTH) {
      throw new Error(
        `Name must be at least ${MIN_NAME_LENGTH} characters long`
      );
    }
    if (name.trim().length > MAX_NAME_LENGTH) {
      throw new Error(`Name cannot exceed ${MAX_NAME_LENGTH} characters`);
    }
  }

  // Validate email
  if (email !== undefined) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  // Validate message
  if (message !== undefined) {
    if (
      typeof message !== "string" ||
      message.trim().length < MIN_MESSAGE_LENGTH
    ) {
      throw new Error(
        `Message must be at least ${MIN_MESSAGE_LENGTH} characters long`
      );
    }
    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`);
    }
  }

  // Validate subject
  if (subject !== undefined) {
    if (
      typeof subject === "string" &&
      subject.trim().length > MAX_SUBJECT_LENGTH
    ) {
      throw new Error(`Subject cannot exceed ${MAX_SUBJECT_LENGTH} characters`);
    }
  }

  // Validate phone
  if (phone !== undefined) {
    if (typeof phone === "string" && phone.trim().length > MAX_PHONE_LENGTH) {
      throw new Error(
        `Phone number cannot exceed ${MAX_PHONE_LENGTH} characters`
      );
    }
    if (phone && typeof phone === "string") {
      const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;
      if (!phoneRegex.test(phone.trim())) {
        throw new Error("Invalid Nigerian phone number format");
      }
    }
  }

  // Validate priority
  if (priority !== undefined) {
    if (!VALID_PRIORITIES.includes(priority)) {
      throw new Error(
        `Invalid priority. Must be one of: ${VALID_PRIORITIES.join(", ")}`
      );
    }
  }

  // Validate status
  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status)) {
      throw new Error(
        `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`
      );
    }
  }
};

/**
 * Validates contact ID parameter
 * @param {string} contactId - Contact ID
 * @throws {Error} If validation fails
 */
const validateContactId = (contactId) => {
  if (!contactId) {
    throw new Error("Contact ID is required");
  }

  // Basic MongoDB ObjectId validation
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(contactId)) {
    throw new Error("Invalid contact ID format");
  }
};

/**
 * @swagger
 * @route POST /api/v1/contact/contactUs
 * @desc Submit a contact form
 * @access Public
 */
const contactUs = asyncHandler(async (req, res) => {
  const { name, email, message, subject, phone, priority } = req.body;

  // Validate input
  validateContactInput(req.body, false);

  try {
    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message.trim(),
      subject: subject?.trim() || "",
      phone: phone?.trim() || "",
      priority: priority || "Medium",
      status: "New",
    });

    if (!contact) {
      res.status(400);
      throw new Error("Failed to create contact message");
    }

    // Return contact data (excluding sensitive information)
    const {
      _id,
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      subject: contactSubject,
      phone: contactPhone,
      priority: contactPriority,
      status: contactStatus,
      createdAt,
    } = contact;

    res.status(201).json({
      success: true,
      message: "Contact message submitted successfully",
      data: {
        _id,
        name: contactName,
        email: contactEmail,
        message: contactMessage,
        subject: contactSubject,
        phone: contactPhone,
        priority: contactPriority,
        status: contactStatus,
        createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    if (error.name === "ValidationError") {
      res.status(400);
      throw new Error(`Validation error: ${error.message}`);
    }
    res.status(500);
    throw new Error("Failed to submit contact message. Please try again");
  }
});

/**
 * @swagger
 * @route GET /api/v1/contact/get-all-contacts
 * @desc Get all contact messages
 * @access Private
 */
const getAllContacts = asyncHandler(async (req, res) => {
  try {
    const {
      status,
      priority,
      limit = 50,
      page = 1,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build query
    let query = {};

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const contacts = await Contact.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .select("-__v");

    const totalContacts = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      count: contacts.length,
      totalContacts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalContacts / parseInt(limit)),
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500);
    throw new Error("Failed to fetch contacts. Please try again");
  }
});

/**
 * @swagger
 * @route GET /api/v1/contact/getContact/{contactId}
 * @desc Get a single contact message by ID
 * @access Private
 */
const getContact = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;

  // Validate contact ID
  validateContactId(contactId);

  try {
    const contact = await Contact.findById(contactId).select("-__v");

    if (!contact) {
      res.status(404);
      throw new Error("Contact message not found");
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    if (
      error.message === "Contact message not found" ||
      error.message === "Invalid contact ID format"
    ) {
      throw error;
    }
    res.status(500);
    throw new Error("Failed to fetch contact message. Please try again");
  }
});

/**
 * @swagger
 * @route DELETE /api/v1/contact/delete/{contactId}
 * @desc Delete a contact message
 * @access Private
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;

  // Validate contact ID
  validateContactId(contactId);

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      res.status(404);
      throw new Error("Contact message not found");
    }

    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
      data: {
        id: contactId,
        name: contact.name,
        email: contact.email,
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    if (
      error.message === "Contact message not found" ||
      error.message === "Invalid contact ID format"
    ) {
      throw error;
    }
    res.status(500);
    throw new Error("Failed to delete contact message. Please try again");
  }
});

/**
 * @swagger
 * @route PATCH /api/v1/contact/update-status/{contactId}
 * @desc Update contact message status
 * @access Private
 */
const updateContactStatus = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;
  const { status, priority } = req.body;

  // Validate contact ID
  validateContactId(contactId);

  // Validate input
  validateContactInput(req.body, true);

  try {
    const updateFields = {};

    if (status !== undefined) {
      updateFields.status = status;
    }

    if (priority !== undefined) {
      updateFields.priority = priority;
    }

    if (Object.keys(updateFields).length === 0) {
      res.status(400);
      throw new Error("No valid fields to update");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedContact) {
      res.status(404);
      throw new Error("Contact message not found");
    }

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    if (
      error.message === "Contact message not found" ||
      error.message === "Invalid contact ID format"
    ) {
      throw error;
    }
    if (error.name === "ValidationError") {
      res.status(400);
      throw new Error(`Validation error: ${error.message}`);
    }
    res.status(500);
    throw new Error("Failed to update contact status. Please try again");
  }
});

module.exports = {
  // Main controller functions
  contactUs,
  getAllContacts,
  getContact,
  deleteContact,
  updateContactStatus,

  // Validation functions
  validateContactInput,
  validateContactId,

  // Constants (for testing or external use)
  VALID_PRIORITIES,
  VALID_STATUSES,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MAX_SUBJECT_LENGTH,
  MIN_MESSAGE_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_PHONE_LENGTH,
};
