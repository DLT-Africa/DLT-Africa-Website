const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");
const { generateToken, hashToken } = require("../utils");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const jwt = require("jsonwebtoken");

const createTeam = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill in all the require fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters.");
  }

  // Check if user exists
  const teamExists = await Team.findOne({ email });

  if (teamExists) {
    res.status(400);
    throw new Error("Email already in use.");
  }

  const team = await Team.create({
    name,
    email,
    phone,
  });

  const token = generateToken(team._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

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
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid team data provided, please confirm!");
  }
});

const loginTeam = asyncHandler(async (req, res) => {
  const { email } = req.body;

  //   Validation
  if (!email) {
    res.status(400);
    throw new Error("Please input your email");
  }

  const team = await Team.findOne({ email });

  if (!team) {
    res.status(404);
    throw new Error("Team not found, please signup");
  }


  const token = generateToken(team._id);

  if (team ) {
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, photo, phone, role, isVerified } = team;

    res.status(201).json({
      _id,
      name,
      email,
      phone,
      photo,
      role,
      isVerified,
      token,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again");
  }
});

const sendVerificationEmail = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.team._id);

  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  }

  if (team.isVerified) {
    res.status(400);
    throw new Error("You are already verified");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ teamId: team._id });
  if (token) {
    await token.deleteOne();
  }

  //   Create Verification Token and Save
  const verificationToken = crypto.randomBytes(32).toString("hex") + team._id;
  console.log(verificationToken);

  // Hash token and save
  const hashedToken = hashToken(verificationToken);
  await new Token({
    userId: team._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  // Send Email
  const subject = "Verify Your Account - AUTH:Z";
  const send_to = team.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "";
  const template = "verifyEmail";
  const name = team.name;
  const link = verificationUrl;

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
    res.status(200).json({ message: "Verification Email Sent successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

const verifyTeam = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  const hashedToken = hashToken(verificationToken);

  const teamToken = await Token.findOne({
    vToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!teamToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find User
  const team = await Team.findOne({ _id: teamToken.teamId });

  if (team.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  // Now verify user
  team.isVerified = true;
  await team.save();

  res.status(200).json({ message: "Account Verification Successful" });
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

const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  console.log(resetToken);
  console.log(password);

  const hashedToken = hashToken(resetToken);

  const teamToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!teamToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find User
  const team = await Team.findOne({ _id: teamToken.teamId });

  // Now Reset password
  team.password = password;
  await team.save();

  res.status(200).json({ message: "Password Reset Successful, please login" });
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
};
