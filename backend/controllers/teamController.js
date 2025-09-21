const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");
const {
  generateToken,
  generateRefreshToken,
  hashToken,
  generateRandomToken,
  sendEmail,
  sendVerificationEmail: sendVerificationEmailUtil,
} = require("../utils");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Constants
const VALID_EMAILS = [
  "naheem@dltafrica.io",
  "aliyuanate016@gmail.com",
  "soliuahmad99@gmail.com",
  "oluwaseyi@dltafrica.io",
  "rajiabdullahi907@outlook.com",
];

const TOKEN_EXPIRY = {
  VERIFICATION: 24 * 60 * 60 * 1000, // 24 hours
  RESET: 60 * 60 * 1000, // 1 hour
  LOGIN: 24 * 60 * 60 * 1000, // 24 hours
};

const MIN_PASSWORD_LENGTH = 6;

/**
 * Validates team registration input
 * @param {Object} reqBody - Request body
 * @throws {Error} If validation fails
 */
const validateTeamInput = (reqBody) => {
  const { name, email, phone, password } = reqBody;

  // Check required fields
  const requiredFields = { name, email, phone, password };
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

  // Validate email against allowed list
  if (!VALID_EMAILS.includes(email)) {
    throw new Error("Email is not authorized for team registration");
  }

  // Validate password strength
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    );
  }

  // Validate phone number format (Nigerian)
  const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error("Invalid Nigerian phone number format");
  }

  // Validate name
  if (name.trim().length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }
};

/**
 * Validates login input
 * @param {Object} reqBody - Request body
 * @throws {Error} If validation fails
 */
const validateLoginInput = (reqBody) => {
  const { email, password } = reqBody;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
};

/**
 * @swagger
 * @route POST /api/v1/team/register-team
 * @desc Register a new team member
 * @access Public
 */
const createTeam = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Validate input
  validateTeamInput(req.body);

  // Check if team member already exists
  const teamExists = await Team.findOne({ email });
  if (teamExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  try {
    // Create team member
    const team = await Team.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
    });

    if (!team) {
      res.status(400);
      throw new Error("Failed to create team account");
    }

    // Generate tokens
    const token = generateToken(team._id);
    const refreshToken = generateRefreshToken(team._id);

    // Set HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + TOKEN_EXPIRY.LOGIN),
      sameSite: "none",
      secure: true,
    });

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      sameSite: "none",
      secure: true,
    });

    // Return team data (excluding sensitive information)
    const {
      _id,
      name: teamName,
      email: teamEmail,
      photo,
      phone: teamPhone,
      role,
      isVerified,
      createdAt,
    } = team;

    res.status(201).json({
      success: true,
      message: "Team member registered successfully",
      data: {
        _id,
        name: teamName,
        email: teamEmail,
        phone: teamPhone,
        photo,
        role,
        isVerified,
        createdAt,
        token,
      },
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    if (error.code === 11000) {
      res.status(400);
      throw new Error("Email already exists");
    }
    res.status(500);
    throw new Error("Failed to create team account");
  }
});

/**
 * @swagger
 * @route POST /api/v1/team/login
 * @desc Login team member
 * @access Public
 */
const loginTeam = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  validateLoginInput(req.body);

  try {
    // Find team member
    const team = await Team.findOne({ email: email.toLowerCase().trim() });
    if (!team) {
      res.status(404);
      throw new Error("Team member not found");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, team.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    // Generate tokens
    const token = generateToken(team._id);
    const refreshToken = generateRefreshToken(team._id);

    // Set HTTP-only cookies
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + TOKEN_EXPIRY.LOGIN),
      sameSite: "none",
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      sameSite: "none",
      secure: true,
    });

    // Return team data (excluding sensitive information)
    const {
      _id,
      name,
      email: teamEmail,
      photo,
      phone,
      role,
      isVerified,
      lastLogin,
      createdAt,
    } = team;

    // Update last login
    team.lastLogin = new Date();
    await team.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id,
        name,
        email: teamEmail,
        phone,
        photo,
        role,
        isVerified,
        lastLogin: team.lastLogin,
        createdAt,
        token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    if (
      error.message === "Team member not found" ||
      error.message === "Invalid credentials"
    ) {
      throw error;
    }
    res.status(500);
    throw new Error("Login failed. Please try again");
  }
});

/**
 * @swagger
 * @route POST /api/v1/team/sendVerificationEmail
 * @desc Send verification email to team member
 * @access Private
 */
const sendVerificationEmail = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.team._id);

  if (!team) {
    res.status(404);
    throw new Error("Team member not found");
  }

  if (team.isVerified) {
    res.status(400);
    throw new Error("Account is already verified");
  }

  try {
    // Delete existing verification token if any
    let token = await Token.findOne({
      userId: team._id,
      tokenType: "verification",
    });
    if (token) {
      await token.deleteOne();
    }

    // Generate new verification token
    const verificationToken = generateRandomToken(32) + team._id;
    const hashedToken = hashToken(verificationToken);

    // Save token to database
    await new Token({
      userId: team._id,
      vToken: hashedToken,
      tokenType: "verification",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + TOKEN_EXPIRY.VERIFICATION),
    }).save();

    // Send verification email using new utility function
    await sendVerificationEmailUtil(team.email, team.name, verificationToken);

    res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
      data: {
        email: team.email,
        expiresIn: TOKEN_EXPIRY.VERIFICATION / (1000 * 60 * 60), // hours
      },
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500);
    throw new Error("Failed to send verification email. Please try again");
  }
});

/**
 * @swagger
 * @route PATCH /api/v1/team/verifyUser/{verificationToken}
 * @desc Verify team member email
 * @access Public
 */
const verifyTeam = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    res.status(400);
    throw new Error("Verification token is required");
  }

  try {
    const hashedToken = hashToken(verificationToken);

    const teamToken = await Token.findOne({
      vToken: hashedToken,
      tokenType: "verification",
      expiresAt: { $gt: new Date() },
    });

    if (!teamToken) {
      res.status(404);
      throw new Error("Invalid or expired verification token");
    }

    // Find team member
    const team = await Team.findById(teamToken.userId);
    if (!team) {
      res.status(404);
      throw new Error("Team member not found");
    }

    if (team.isVerified) {
      res.status(400);
      throw new Error("Account is already verified");
    }

    // Verify team member
    team.isVerified = true;
    team.verifiedAt = new Date();
    await team.save();

    // Delete the used token
    await Token.findByIdAndDelete(teamToken._id);

    res.status(200).json({
      success: true,
      message: "Account verification successful",
      data: {
        name: team.name,
        email: team.email,
        isVerified: team.isVerified,
        verifiedAt: team.verifiedAt,
      },
    });
  } catch (error) {
    console.error("Error verifying team member:", error);
    if (
      error.message === "Invalid or expired verification token" ||
      error.message === "Team member not found" ||
      error.message === "Account is already verified"
    ) {
      throw error;
    }
    res.status(500);
    throw new Error("Verification failed. Please try again");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logout successful" });
});

const getSingleTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.team._id);

  if (team) {
    const { _id, name, email, photo, phone, role, isVerified } = team;

    res.status(201).json({
      _id,
      name,
      email,
      phone,
      photo,
      role,
      isVerified,
    });
  } else {
    res.status(404);
    throw new Error("Team not found");
  }
});

const getAllTeam = asyncHandler(async (req, res) => {
  const teams = await Team.find().sort("-createdAt").select("-password");
  if (!teams) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(teams);
});

const updateTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.team._id);

  if (team) {
    const { name, email, phone, photo, role, isVerified } = team;

    team.email = email;
    team.name = req.body.name || name;
    team.phone = req.body.phone || phone;
    team.photo = req.body.photo || photo;

    const updatedTeam = await team.save();

    res.status(200).json({
      _id: updatedTeam._id,
      name: updatedTeam.name,
      email: updatedTeam.email,
      phone: updatedTeam.phone,
      photo: updatedTeam.photo,
      role: updatedTeam.role,
      isVerified: updatedTeam.isVerified,
    });
  } else {
    res.status(404);
    throw new Error("Team not found");
  }
});

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

const deleteTeam = asyncHandler(async (req, res) => {
  const team = Team.findById(req.params.id);

  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  }

  await team.deleteOne();
  res.status(200).json({
    message: "Team deleted successfully",
  });
});

const sendAutomatedEmail = asyncHandler(async (req, res) => {
  const { subject, send_to, reply_to, template, url } = req.body;

  if (!subject || !send_to || !reply_to || !template) {
    res.status(500);
    throw new Error("Missing email parameter");
  }

  // Get user
  const team = await Team.findOne({ email: send_to });

  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  }

  const sent_from = process.env.EMAIL_USER;
  const name = team.name;
  const link = `${process.env.FRONTEND_URL}${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const team = await Team.findOne({ email });

  if (!team) {
    res.status(404);
    throw new Error("No team registered with this email");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ teamId: team._id });
  if (token) {
    await token.deleteOne();
  }

  //   Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString("hex") + team._id;
  console.log(resetToken);

  // Hash token and save
  const hashedToken = hashToken(resetToken);
  await new Token({
    teamId: team._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  // Send Email
  const subject = "Password Reset Request - AUTH:Z";
  const send_to = team.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@zino.com";
  const template = "forgotPassword";
  const name = team.name;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Password Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

/**
 * @swagger
 * @route PATCH /api/v1/team/resetPassword/{resetToken}
 * @desc Reset team member password
 * @access Public
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  if (!resetToken) {
    res.status(400);
    throw new Error("Reset token is required");
  }

  if (!password) {
    res.status(400);
    throw new Error("New password is required");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    res.status(400);
    throw new Error(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    );
  }

  try {
    const hashedToken = hashToken(resetToken);

    const teamToken = await Token.findOne({
      rToken: hashedToken,
      tokenType: "reset",
      expiresAt: { $gt: new Date() },
    });

    if (!teamToken) {
      res.status(404);
      throw new Error("Invalid or expired reset token");
    }

    // Find team member
    const team = await Team.findById(teamToken.userId);
    if (!team) {
      res.status(404);
      throw new Error("Team member not found");
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password
    team.password = hashedPassword;
    team.passwordChangedAt = new Date();
    await team.save();

    // Delete the used token
    await Token.findByIdAndDelete(teamToken._id);

    res.status(200).json({
      success: true,
      message: "Password reset successful. Please login with your new password",
      data: {
        email: team.email,
        passwordChangedAt: team.passwordChangedAt,
      },
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    if (
      error.message === "Invalid or expired reset token" ||
      error.message === "Team member not found"
    ) {
      throw error;
    }
    res.status(500);
    throw new Error("Password reset failed. Please try again");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;
  const team = await Team.findById(req.team._id);

  if (!team) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please enter old and new password");
  }

  // Check if old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, team.password);

  // Save new password
  if (team && passwordIsCorrect) {
    team.password = password;
    await team.save();

    res
      .status(200)
      .json({ message: "Password change successful, please re-login" });
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

module.exports = {
  // Main controller functions
  createTeam,
  loginTeam,
  sendVerificationEmail,
  verifyTeam,
  logout,
  getSingleTeam,
  getAllTeam,
  updateTeam,
  loginStatus,
  deleteTeam,
  sendAutomatedEmail,
  forgotPassword,
  resetPassword,
  changePassword,

  // Validation functions
  validateTeamInput,
  validateLoginInput,

  // Constants (for testing or external use)
  VALID_EMAILS,
  TOKEN_EXPIRY,
  MIN_PASSWORD_LENGTH,
};
