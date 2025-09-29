const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Configuration constants
const COURSE_PRICING = {
  // Regular courses - Physical class pricing
  PHYSICAL: {
    "Frontend Development": { basePrice: 420000, discount: 0.5 },
    "Graphics Design": { basePrice: 150000, discount: 0.8 },
    "Product UI/UX Design": { basePrice: 170000, discount: 0.5 },
    "Full-Stack Development": { basePrice: 630000, discount: 0.5 },
    "Backend Development": { basePrice: 450000, discount: 0.5 },
    "Mobile Development": { basePrice: 500000, discount: 0.5 },
  },
  // Regular courses - Online class pricing
  ONLINE: {
    "Frontend Development": { basePrice: 370000, discount: 0.5 },
    "Graphics Design": { basePrice: 150000, discount: 0.8 },
    "Product UI/UX Design": { basePrice: 170000, discount: 0.5 },
    "Blockchain Development": { basePrice: 0, discount: 0 },
    "Backend Development": { basePrice: 400000, discount: 0.5 },
    "Mobile Development": { basePrice: 450000, discount: 0.5 },
  },
  // Corpers courses
  CORPERS: {
    "Web Start Essential": 70000,
    "Product UI/UX Design": 70000,
    "Code Master Intermediate": 150000,
    "Frontend Fundamentals": 70000,
    "Backend Fundamentals": 70000,
  },
};

const VALID_CLASS_TYPES = ["Physical", "Virtual", "Online", "Hybrid"];
const VALID_COURSES = [
  "Frontend Development",
  "Graphics Design",
  "Product UI/UX Design",
  "Full-Stack Development",
  "Backend Development",
  "Mobile Development",
  "Blockchain Development",
  "Web Start Essential",
  "Code Master Intermediate",
  "Frontend Fundamentals",
  "Backend Fundamentals",
];

/**
 * Generates a JWT token for user authentication
 * @param {string|ObjectId} id - User ID
 * @param {string} expiresIn - Token expiration time (default: "1d")
 * @returns {string} JWT token
 */
const generateToken = (id, expiresIn = "1d") => {
  if (!id) {
    throw new Error("User ID is required to generate token");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Generates a refresh token with longer expiration
 * @param {string|ObjectId} id - User ID
 * @returns {string} Refresh JWT token
 */
const generateRefreshToken = (id) => {
  return generateToken(id, "7d");
};

/**
 * Verifies a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token is required for verification");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Hashes a token using SHA-256
 * @param {string} token - Token to hash
 * @returns {string} Hashed token
 */
const hashToken = (token) => {
  if (!token) {
    throw new Error("Token is required for hashing");
  }

  return crypto.createHash("sha256").update(token.toString()).digest("hex");
};

/**
 * Generates a random token
 * @param {number} length - Token length (default: 32)
 * @returns {string} Random token
 */
const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

/**
 * Creates and configures nodemailer transporter
 * @returns {Object} Nodemailer transporter
 */
const createEmailTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials not configured");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendEmail = async (mailOptions) => {
  if (!mailOptions || !mailOptions.to || !mailOptions.subject) {
    throw new Error("Invalid email options: to and subject are required");
  }

  try {
    const transporter = createEmailTransporter();
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      ...mailOptions,
    });

    console.log("Email sent successfully to:", mailOptions.to);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

const sendVerificationEmail = async (email, name, verificationToken) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    to: email,
    subject: "Verify Your Email - DLT Africa",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to DLT Africa, ${name}!</h2>
        <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email</a>
        <p>If the button doesn't work, copy and paste this link: ${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  };

  return sendEmail(mailOptions);
};

const sendPasswordResetEmail = async (email, name, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    to: email,
    subject: "Reset Your Password - DLT Africa",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hello ${name},</p>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
        <p>If the button doesn't work, copy and paste this link: ${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  return sendEmail(mailOptions);
};

const validateCourseInputs = (courseSelected, classType) => {
  if (!courseSelected || typeof courseSelected !== "string") {
    throw new Error("Course selection is required and must be a string");
  }

  if (!classType || typeof classType !== "string") {
    throw new Error("Class type is required and must be a string");
  }

  if (!VALID_COURSES.includes(courseSelected)) {
    throw new Error(
      `Invalid course selected. Must be one of: ${VALID_COURSES.join(", ")}`
    );
  }

  if (!VALID_CLASS_TYPES.includes(classType)) {
    throw new Error(
      `Invalid class type. Must be one of: ${VALID_CLASS_TYPES.join(", ")}`
    );
  }
};

/**
 * Calculates tuition fee for regular courses
 * @param {string} courseSelected - Selected course
 * @param {string} classType - Class type (Physical, Virtual, Online, Hybrid)
 * @returns {number} Calculated tuition fee
 */
const calculateTuitionFee = (courseSelected, classType) => {
  validateCourseInputs(courseSelected, classType);

  let pricingConfig;

  // Map class types to pricing configurations
  if (classType === "Physical") {
    pricingConfig = COURSE_PRICING.PHYSICAL;
  } else if (["Virtual", "Online", "Hybrid"].includes(classType)) {
    pricingConfig = COURSE_PRICING.ONLINE;
  } else {
    throw new Error(`Unsupported class type: ${classType}`);
  }

  const coursePricing = pricingConfig[courseSelected];

  if (!coursePricing) {
    console.warn(
      `No pricing found for course: ${courseSelected} in ${classType} class`
    );
    return 0;
  }

  const { basePrice, discount } = coursePricing;
  return Math.round(basePrice * discount);
};

/**
 * Calculates tuition fee for corpers courses
 * @param {string} courseSelected - Selected course
 * @returns {number} Calculated tuition fee
 */
const calculateCorpersFee = (courseSelected) => {
  if (!courseSelected || typeof courseSelected !== "string") {
    throw new Error("Course selection is required and must be a string");
  }

  const fee = COURSE_PRICING.CORPERS[courseSelected];

  if (fee === undefined) {
    console.warn(`No pricing found for corpers course: ${courseSelected}`);
    return 0;
  }

  return fee;
};

/**
 * Gets all available courses for a specific class type
 * @param {string} classType - Class type
 * @returns {Array<string>} Available courses
 */
const getAvailableCourses = (classType) => {
  if (!VALID_CLASS_TYPES.includes(classType)) {
    throw new Error(
      `Invalid class type. Must be one of: ${VALID_CLASS_TYPES.join(", ")}`
    );
  }

  if (classType === "Physical") {
    return Object.keys(COURSE_PRICING.PHYSICAL);
  } else if (["Virtual", "Online", "Hybrid"].includes(classType)) {
    return Object.keys(COURSE_PRICING.ONLINE);
  }

  return [];
};

/**
 * Gets all available corpers courses
 * @returns {Array<string>} Available corpers courses
 */
const getCorpersCourses = () => {
  return Object.keys(COURSE_PRICING.CORPERS);
};

/**
 * Formats currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: "NGN")
 * @returns {string} Formatted currency string
 */
const formatCurrency = (amount, currency = "NGN") => {
  if (typeof amount !== "number" || amount < 0) {
    throw new Error("Amount must be a positive number");
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

module.exports = {
  // Token utilities
  generateToken,
  generateRefreshToken,
  verifyToken,
  hashToken,
  generateRandomToken,

  // Email utilities
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  createEmailTransporter,

  // Fee calculation utilities
  calculateTuitionFee,
  calculateCorpersFee,
  getAvailableCourses,
  getCorpersCourses,
  formatCurrency,

  validateCourseInputs,

  // Constants
  COURSE_PRICING,
  VALID_CLASS_TYPES,
  VALID_COURSES,
};
