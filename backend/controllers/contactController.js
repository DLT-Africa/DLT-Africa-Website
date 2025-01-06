const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

const contactUs = asyncHandler(async (req, res) => {
  const { orgName, emailAddress, message } = req.body;

  if (!orgName || !emailAddress || !message) {
    res.status(400);
    throw new Error("Please fill in all the require fields");
  }


  const contact = await Contact.create({
    orgName,
    emailAddress,
    message,
  });



  if (contact) {
    const { orgName, emailAddress, message } = contact;

    res.status(201).json({
      orgName,
      emailAddress,
      message,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong, please check!");
  }
});


const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort("-createdAt");
  if (!contacts) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(contacts);
});

const getContact = async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const contact = await Contact.findById(contactId);

    if (contact) {
      const { orgName, emailAddress, message } = contact;

      res.status(200).json({
        orgName,
        emailAddress,
        message,
      });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteContact = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const contact = Contact.findById(contactId);

    if (!contact) {
      res.status(404);
      throw new Error("Message not found");
    }

    await contact.deleteOne();
    res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = {
    contactUs,
    getAllContacts,
    getContact,
    deleteContact
};
