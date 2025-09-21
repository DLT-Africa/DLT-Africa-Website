const asyncHandler = require("express-async-handler");
const CohortSev = require("../models/userModel");
const Corper = require("../models/corpers");
const {
  sendEmail,
  calculateTuitionFee,
  calculateCorpersFee,
  formatCurrency,
  validateCourseInputs,
} = require("../utils");

// Constants
const ADMIN_EMAILS = [
  "info@dltafrica.io",
  "aliu@dltafrica.io",
  "rajiabdullahi907@gmail.com",
];

const WHATSAPP_CONTACTS = "08156509701 OR 08133083895";
const BANK_DETAILS = {
  name: "Access Bank",
  accountName: "DLT AFRICA SPACE LIMITED",
  accountNumber: "1709346763",
};

/**
 * Validates user registration input
 * @param {Object} reqBody - Request body
 * @throws {Error} If validation fails
 */
const validateUserInput = (reqBody) => {
  const {
    firstName,
    lastName,
    dob,
    academicQualification,
    courseSelected,
    classType,
    stateOfOrigin,
    gender,
    phoneNo,
    emailAddress,
    codeExperience,
    stateOfResidence,
  } = reqBody;

  // Check required fields
  const requiredFields = {
    firstName,
    lastName,
    dob,
    academicQualification,
    courseSelected,
    classType,
    stateOfOrigin,
    gender,
    phoneNo,
    emailAddress,
    codeExperience,
    stateOfResidence,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(
      ([key, value]) => !value || (typeof value === "string" && !value.trim())
    )
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  // Validate course and class type using utils
  try {
    validateCourseInputs(courseSelected, classType);
  } catch (error) {
    throw new Error(`Course validation failed: ${error.message}`);
  }
};

/**
 * Validates corpers registration input
 * @param {Object} reqBody - Request body
 * @throws {Error} If validation fails
 */
const validateCorpersInput = (reqBody) => {
  const {
    fullName,
    email,
    phoneNumber,
    gender,
    stateOfOrigin,
    corpId,
    courseSelected,
    batchResumption,
    stateCode,
  } = reqBody;

  // Check required fields
  const requiredFields = {
    fullName,
    email,
    phoneNumber,
    gender,
    stateOfOrigin,
    corpId,
    courseSelected,
    batchResumption,
    stateCode,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(
      ([key, value]) => !value || (typeof value === "string" && !value.trim())
    )
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // Validate phone number format (Nigerian)
  const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;
  if (!phoneRegex.test(phoneNumber)) {
    throw new Error("Invalid Nigerian phone number format");
  }
};

/**
 * Generates student registration confirmation email template
 * @param {Object} user - User data
 * @param {number} tuitionFee - Calculated tuition fee
 * @returns {Object} Email options
 */
const generateStudentConfirmationEmail = (user, tuitionFee) => {
  const formattedFee = formatCurrency(tuitionFee);

  return {
    to: user.emailAddress,
    subject: "DLT Africa Training Registration Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="DLT Africa logo" style="max-width: 200px; margin-bottom: 20px;">
        
        <h1>Hello ${user.firstName},</h1>
        
        <p>Thanks for applying for DLT Africa Training to study <strong>${user.courseSelected}</strong>.</p>
        
        <p>Your application has been received and a member of our team will review and get back to you as soon as possible.</p>
        
        <h3>What does this mean?</h3>
        <ul>
          <li>If you do not already possess a laptop, it's time to acquire one with minimum specification of 8GB RAM and 250GB ROM SSD.</li>
          <li>If you lack basic knowledge of computers, now is the time to start learning.</li>
        </ul>
        
        <p>As part of our requirements to confirm your admission, you are required to make a tuition deposit of <strong>${formattedFee}</strong> of the total tuition fee on or before November 30th, 2024.</p>
        
        <p><strong>ONLY those who make the tuition deposit will be considered to have secured a place, and those who have not completed their deposit shall lose their place to other candidates in the pipeline.</strong></p>
        
        <h3>Payment Details:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Bank Name:</strong> ${BANK_DETAILS.name}</p>
          <p><strong>Account Name:</strong> ${BANK_DETAILS.accountName}</p>
          <p><strong>Account Number:</strong> ${BANK_DETAILS.accountNumber}</p>
        </div>
        
        <p>Please share the receipt of payment on WhatsApp through either of these contacts: ${WHATSAPP_CONTACTS}.</p>
        
        <p>Once payment has been confirmed, we shall share resources to get you started ahead of the training.</p>
        
        <p>We look forward to embarking on this journey with you.</p>
        
        <p>Regards,<br>DLT Africa Team</p>
      </div>
    `,
  };
};

const generateCorpersConfirmationEmail = (corper, tuitionFee) => {
  const formattedFee = formatCurrency(tuitionFee);

  return {
    to: corper.email,
    subject: "DLT Africa Training Registration Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="DLT Africa logo" style="max-width: 200px; margin-bottom: 20px;">
        
        <h1>Hello ${corper.fullName},</h1>
        
        <p>Thanks for applying for DLT Africa Training to study <strong>${corper.courseSelected}</strong>.</p>
        
        <p>Your application has been received and a member of our team will review and get back to you as soon as possible.</p>
        
        <h3>What does this mean?</h3>
        <ul>
          <li>If you do not already possess a laptop, it's time to acquire one with minimum specification of 8GB RAM and 250GB ROM SSD.</li>
          <li>If you lack basic knowledge of computers, now is the time to start learning.</li>
        </ul>
        
        <p>As part of our requirements to confirm your admission, you are required to make a tuition payment of <strong>${formattedFee}</strong> after 3 weeks of receiving this message.</p>
        
        <p><strong>ONLY those who make the tuition deposit will be considered to have secured a place, and those who have not completed their deposit shall lose their place to other candidates in the pipeline.</strong></p>
        
        <h3>Payment Details:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Bank Name:</strong> ${BANK_DETAILS.name}</p>
          <p><strong>Account Name:</strong> ${BANK_DETAILS.accountName}</p>
          <p><strong>Account Number:</strong> ${BANK_DETAILS.accountNumber}</p>
        </div>
        
        <p>Please share the receipt of payment on WhatsApp through either of these contacts: ${WHATSAPP_CONTACTS}.</p>
        
        <p>Once payment has been confirmed, we shall share resources to get you started ahead of the training.</p>
        
        <p>We look forward to embarking on this journey with you.</p>
        
        <p>Regards,<br>DLT Africa Team</p>
      </div>
    `,
  };
};

/**
 * Generates admin notification email template
 * @param {Object} user - User data
 * @param {string} type - User type ('student' or 'corper')
 * @returns {Object} Email options
 */
const generateAdminNotificationEmail = (user, type = "student") => {
  const isStudent = type === "student";
  const name = isStudent ? `${user.firstName} ${user.lastName}` : user.fullName;
  const course = isStudent ? user.courseSelected : user.courseSelected;
  const additionalInfo = isStudent
    ? `via ${user.classType}`
    : `with ${user.corpId} via batch ${user.batchResumption}`;

  return {
    to: ADMIN_EMAILS.join(", "),
    subject: "New Registration Notification",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1>New Registration Notification</h1>
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="DLT Africa logo" style="max-width: 200px; margin: 20px 0;">
        
        <p>A new ${type}, <strong>${name}</strong>, has registered for DLT Africa Training to study <strong>${course}</strong> ${additionalInfo}.</p>
        
        <p>Please take necessary actions to review the application.</p>
        
        <p>Regards,<br>DLT Africa Team</p>
      </div>
    `,
  };
};

/**
 * Generates status update email template
 * @param {Object} user - User data
 * @param {string} status - New status
 * @returns {Object} Email options
 */
const generateStatusUpdateEmail = (user, status) => {
  let subject = "";
  let content = "";

  switch (status.toLowerCase()) {
    case "paid":
      subject = "Payment Confirmation";
      content = `
        <h1>Dear ${user.firstName},</h1>
        <p>We are pleased to inform you that your first payment has been received! This brings you one step closer to unlocking the full potential of our services.</p>
        <p>If you have any questions or concerns, please don't hesitate to contact our support team at ${WHATSAPP_CONTACTS}.</p>
      `;
      break;
    case "accepted":
      subject = "Application Accepted";
      content = `
        <h1>Dear ${user.firstName},</h1>
        <p>We are pleased to inform you that your application has been accepted into DLT Africa Cohort 5.0 for <strong>${user.courseSelected}</strong>! Welcome aboard 🎊!</p>
        <p>We request you to join the WhatsApp group for your batch <a href="https://chat.whatsapp.com/BrknqYS3BiJGD3ekWjcIom" style="color: #007bff;">here</a>.</p>
        <p>If you have any questions or concerns, please don't hesitate to contact our support team at ${WHATSAPP_CONTACTS}.</p>
      `;
      break;
    default:
      return null;
  }

  return {
    to: user.emailAddress,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="DLT Africa logo" style="max-width: 200px; margin-bottom: 20px;">
        ${content}
        <p>Best regards,<br>DLT Africa Team</p>
      </div>
    `,
  };
};

/**
 * @swagger
 * @route POST /api/v1/cohorts/studentreg
 * @desc Register a new student
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { emailAddress } = req.body;

  // Validate input
  validateUserInput(req.body);

  // Check if user already exists
  const userExists = await CohortSev.findOne({ emailAddress });
  if (userExists) {
    res.status(400);
    throw new Error("Email already in use.");
  }

  // Create user
  const user = await CohortSev.create(req.body);

  if (!user) {
    res.status(400);
    throw new Error("Failed to create user account");
  }

  try {
    // Calculate tuition fee
    const tuitionFee = calculateTuitionFee(user.courseSelected, user.classType);

    // Send confirmation email to user
    const userEmailOptions = generateStudentConfirmationEmail(user, tuitionFee);
    await sendEmail(userEmailOptions);

    // Send notification email to admins
    const adminEmailOptions = generateAdminNotificationEmail(user, "student");
    await sendEmail(adminEmailOptions);

    // Return user data (excluding sensitive information)
    const {
      _id,
      firstName,
      lastName,
      dob,
      academicQualification,
      courseSelected,
      classType,
      stateOfOrigin,
      gender,
      phoneNo,
      codeExperience,
      stateOfResidence,
      status,
      createdAt,
    } = user;

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email for confirmation.",
      data: {
        _id,
        firstName,
        lastName,
        dob,
        academicQualification,
        courseSelected,
        classType,
        stateOfOrigin,
        gender,
        phoneNo,
        emailAddress,
        codeExperience,
        stateOfResidence,
        status,
        createdAt,
        tuitionFee: formatCurrency(tuitionFee),
      },
    });
  } catch (error) {
    // If email sending fails, still return success but log the error
    console.error("Email sending failed:", error);

    res.status(201).json({
      success: true,
      message:
        "Registration successful, but confirmation email could not be sent. Please contact support.",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        courseSelected: user.courseSelected,
        classType: user.classType,
        status: user.status,
      },
    });
  }
});

/**
 * @swagger
 * @route POST /api/v1/cohorts/corperreg
 * @desc Register a new corper
 * @access Public
 */
const corpersReg = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate input
  validateCorpersInput(req.body);

  // Check if corper already exists
  const corperExists = await Corper.findOne({ email });
  if (corperExists) {
    res.status(400);
    throw new Error("Email already in use.");
  }

  // Create corper
  const corper = await Corper.create(req.body);

  if (!corper) {
    res.status(400);
    throw new Error("Failed to create corper account");
  }

  try {
    // Calculate tuition fee
    const tuitionFee = calculateCorpersFee(corper.courseSelected);

    // Send confirmation email to corper
    const corperEmailOptions = generateCorpersConfirmationEmail(
      corper,
      tuitionFee
    );
    await sendEmail(corperEmailOptions);

    // Send notification email to admins
    const adminEmailOptions = generateAdminNotificationEmail(corper, "corper");
    await sendEmail(adminEmailOptions);

    // Return corper data (excluding sensitive information)
    const {
      _id,
      fullName,
      email,
      phoneNumber,
      gender,
      stateOfOrigin,
      corpId,
      courseSelected,
      batchResumption,
      stateCode,
      status,
      createdAt,
    } = corper;

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email for confirmation.",
      data: {
        _id,
        fullName,
        email,
        phoneNumber,
        gender,
        stateOfOrigin,
        corpId,
        courseSelected,
        batchResumption,
        stateCode,
        status,
        createdAt,
        tuitionFee: formatCurrency(tuitionFee),
      },
    });
  } catch (error) {
    // If email sending fails, still return success but log the error
    console.error("Email sending failed:", error);

    res.status(201).json({
      success: true,
      message:
        "Registration successful, but confirmation email could not be sent. Please contact support.",
      data: {
        _id: corper._id,
        fullName: corper.fullName,
        email: corper.email,
        courseSelected: corper.courseSelected,
        batchResumption: corper.batchResumption,
        status: corper.status,
      },
    });
  }
});

/**
 * @swagger
 * @route GET /api/v1/cohorts/get-all-corpers
 * @desc Get all corpers
 * @access Private
 */
const getCorpers = asyncHandler(async (req, res) => {
  try {
    const corpers = await Corper.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      count: corpers.length,
      data: corpers,
    });
  } catch (error) {
    console.error("Error fetching corpers:", error);
    res.status(500);
    throw new Error("Failed to fetch corpers data");
  }
});

/**
 * @swagger
 * @route GET /api/v1/cohorts/get-all-admissions
 * @desc Get all student admissions (excludes cancelled by default)
 * @access Private
 * @query {boolean} includeCancelled - Include cancelled admissions (default: false)
 */
const getAdmissions = asyncHandler(async (req, res) => {
  try {
    const admissions = await CohortSev.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      count: admissions.length,
      data: admissions,
    });
  } catch (error) {
    console.error("Error fetching admissions:", error);
    res.status(500);
    throw new Error("Failed to fetch admissions data");
  }
});

/**
 * @swagger
 * @route POST /api/v1/cohorts/upgrade-admission
 * @desc Update admission status
 * @access Private
 */
const upgradeData = asyncHandler(async (req, res) => {
  const { status, id } = req.body;

  // Validate input
  if (!id) {
    res.status(400);
    throw new Error("User ID is required");
  }

  if (!status) {
    res.status(400);
    throw new Error("Status is required");
  }

  // Valid status values
  const validStatuses = [
    "Not Paid",
    "Paid",
    "Pending",
    "Cancelled",
    "Accepted",
  ];
  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error(
      `Invalid status. Must be one of: ${validStatuses.join(", ")}`
    );
  }

  try {
    // Find user
    const user = await CohortSev.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update status
    const previousStatus = user.status;
    user.status = status;
    await user.save();

    // Send status update email if applicable
    try {
      const statusUpdateEmail = generateStatusUpdateEmail(user, status);
      if (statusUpdateEmail) {
        await sendEmail(statusUpdateEmail);
      }
    } catch (emailError) {
      console.error("Failed to send status update email:", emailError);
      // Don't fail the entire operation if email fails
    }

    res.status(200).json({
      success: true,
      message: `User status updated from "${previousStatus}" to "${status}"`,
      data: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddress,
        previousStatus,
        newStatus: status,
        courseSelected: user.courseSelected,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    if (error.message === "User not found") {
      throw error;
    }
    res.status(500);
    throw new Error("Failed to update user status");
  }
});

module.exports = {
  // Main controller functions
  registerUser,
  corpersReg,
  getAdmissions,
  getCorpers,
  upgradeData,

  // Validation functions
  validateUserInput,
  validateCorpersInput,

  // Email template functions (for testing or external use)
  generateStudentConfirmationEmail,
  generateCorpersConfirmationEmail,
  generateAdminNotificationEmail,
  generateStatusUpdateEmail,
};
