const asyncHandler = require("express-async-handler");
const Waitlist = require("../models/waitlistModel");
const { sendEmail } = require("../utils");

const validateWaitlistInput = (reqBody) => {
  const { name, email } = reqBody;

  if (!name || !email) {
    throw new Error("Name and email are required fields.");
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Please provide a valid email address.");
  }
};

const joinWaitlist = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  validateWaitlistInput(req.body);

  // Check if email already exists in waitlist
  const existingUser = await Waitlist.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("Email already exists in waitlist.");
  }

  const waitlistEntry = await Waitlist.create({
    name,
    email,
    phone: phone || undefined,
  });

  if (waitlistEntry) {
    // Send confirmation email to user
    await sendEmail({
      from: process.env.EMAIL_USER,
      to: waitlistEntry.email,
      subject: "Welcome to DLT Africa Waitlist!",
      html: `
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="DLT Africa logo">
        <h1>Hello ${waitlistEntry.name},</h1>
        <p>Thank you for joining the DLT Africa waitlist!</p>
        <p>You're now on our priority list and will be among the first to know when our next cohort opens for registration.</p>
        <p>We'll keep you updated on:</p>
        <ul>
          <li>Upcoming training programs</li>
          <li>Early bird registration opportunities</li>
          <li>Special announcements and events</li>
        </ul>
        <p>Stay tuned for exciting updates!</p>
        <p>Best regards,</p>
        <p>DLT Africa Team</p>
      `,
    });

    // Send notification to admin team
    const emailAddresses = [
      "info@dltafrica.io",
      "aliu@dltafrica.io",
      "rajiabdullahi907@gmail.com",
    ];
    await sendEmail({
      from: process.env.EMAIL_USER,
      to: emailAddresses.join(", "),
      subject: "New Waitlist Entry",
      html: `
        <h1>New Waitlist Entry</h1>
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="DLT Africa logo">
        <p>A new person has joined the waitlist:</p>
        <p><strong>Name:</strong> ${waitlistEntry.name}</p>
        <p><strong>Email:</strong> ${waitlistEntry.email}</p>
        ${
          waitlistEntry.phone
            ? `<p><strong>Phone:</strong> ${waitlistEntry.phone}</p>`
            : ""
        }
        <p>Total waitlist count: ${await Waitlist.countDocuments()}</p>
        <p>Regards,</p>
        <p>DLT Africa Team</p>
      `,
    });

    res.status(201).json({
      message: "Successfully joined waitlist!",
      data: {
        _id: waitlistEntry._id,
        name: waitlistEntry.name,
        email: waitlistEntry.email,
        phone: waitlistEntry.phone,
        createdAt: waitlistEntry.createdAt,
      },
    });
  } else {
    res.status(400);
    throw new Error("Failed to join waitlist");
  }
});

const getWaitlist = asyncHandler(async (req, res) => {
  const waitlistEntries = await Waitlist.find().sort("-createdAt");

  if (!waitlistEntries) {
    res.status(500);
    throw new Error("Something went wrong while fetching waitlist");
  }

  res.status(200).json({
    count: waitlistEntries.length,
    data: waitlistEntries,
  });
});

const deleteWaitlistEntry = asyncHandler(async (req, res) => {
  const entry = await Waitlist.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error("Waitlist entry not found");
  }

  await entry.deleteOne();
  res.status(200).json({
    message: "Waitlist entry deleted successfully",
  });
});

module.exports = {
  joinWaitlist,
  getWaitlist,
  deleteWaitlistEntry,
};
