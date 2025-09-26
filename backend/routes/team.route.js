const express = require("express");
const {
  createTeam,
  loginTeam,
  logout,
  getSingleTeam,
  deleteTeam,
  getAllTeam,
  loginStatus,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyTeam,
  forgotPassword,
  updateTeam,
  resetPassword,
  changePassword,
} = require("../controllers/team.controller");
const router = express.Router();

/**
 * @swagger
 * /api/v1/team/register-team:
 *   post:
 *     summary: Register a new team member
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Team member's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Team member's email address
 *               phone:
 *                 type: string
 *                 description: Team member's phone number
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Team member's password
 *     responses:
 *       201:
 *         description: Team member registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/register-team", createTeam);

/**
 * @swagger
 * /api/v1/team/login:
 *   post:
 *     summary: Login team member
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Team member's email address
 *               password:
 *                 type: string
 *                 description: Team member's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", loginTeam);

/**
 * @swagger
 * /api/v1/team/logout:
 *   get:
 *     summary: Logout team member
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/logout", logout);

/**
 * @swagger
 * /api/v1/team/get-single-team:
 *   get:
 *     summary: Get single team member details
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Team member details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/get-single-team", getSingleTeam);

/**
 * @swagger
 * /api/v1/team/update-team-details:
 *   patch:
 *     summary: Update team member details
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Team member's name
 *               phone:
 *                 type: string
 *                 description: Team member's phone number
 *               photo:
 *                 type: string
 *                 description: Team member's photo URL
 *     responses:
 *       200:
 *         description: Team member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/update-team-details", updateTeam);

/**
 * @swagger
 * /api/v1/team/{id}:
 *   delete:
 *     summary: Delete team member
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team member ID
 *     responses:
 *       200:
 *         description: Team member deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Team member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", deleteTeam);

/**
 * @swagger
 * /api/v1/team/team-details:
 *   get:
 *     summary: Get all team members
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all team members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/team-details", getAllTeam);

/**
 * @swagger
 * /api/v1/team/loginStatus:
 *   get:
 *     summary: Check login status
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: Login status checked
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 */
router.get("/loginStatus", loginStatus);

/**
 * @swagger
 * /api/v1/team/sendAutomatedEmail:
 *   post:
 *     summary: Send automated email
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - send_to
 *               - reply_to
 *               - template
 *             properties:
 *               subject:
 *                 type: string
 *                 description: Email subject
 *               send_to:
 *                 type: string
 *                 format: email
 *                 description: Recipient email
 *               reply_to:
 *                 type: string
 *                 format: email
 *                 description: Reply-to email
 *               template:
 *                 type: string
 *                 description: Email template
 *               url:
 *                 type: string
 *                 description: URL to include in email
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Team member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/sendAutomatedEmail", sendAutomatedEmail);

/**
 * @swagger
 * /api/v1/team/sendVerificationEmail:
 *   post:
 *     summary: Send verification email
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     expiresIn:
 *                       type: number
 *       400:
 *         description: Account already verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/sendVerificationEmail", sendVerificationEmail);

/**
 * @swagger
 * /api/v1/team/verifyUser/{verificationToken}:
 *   patch:
 *     summary: Verify team member email
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: verificationToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token
 *     responses:
 *       200:
 *         description: Account verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     isVerified:
 *                       type: boolean
 *                     verifiedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/verifyUser/:verificationToken", verifyTeam);

/**
 * @swagger
 * /api/v1/team/forgotPassword:
 *   post:
 *     summary: Send password reset email
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Team member's email address
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Team member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/forgotPassword", forgotPassword);

/**
 * @swagger
 * /api/v1/team/resetPassword/{resetToken}:
 *   patch:
 *     summary: Reset team member password
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     passwordChangedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/resetPassword/:resetToken", resetPassword);

/**
 * @swagger
 * /api/v1/team/changePassword:
 *   patch:
 *     summary: Change team member password
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - password
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Current password
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid old password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/changePassword", changePassword);

module.exports = router;
