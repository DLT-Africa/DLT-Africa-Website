const express = require("express");
const {
  registerUser,
  getAdmissions,
  upgradeData,
  corpersReg,
  getCorpers,
} = require("../controllers/user.controller");
const router = express.Router();

/**
 * @swagger
 * /api/v1/cohorts/studentreg:
 *   post:
 *     summary: Register a new student
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Student's first name
 *               lastName:
 *                 type: string
 *                 description: Student's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Student's email address
 *               phone:
 *                 type: string
 *                 description: Student's phone number
 *               program:
 *                 type: string
 *                 description: Program of interest
 *     responses:
 *       201:
 *         description: Student registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/studentreg", registerUser);

/**
 * @swagger
 * /api/v1/cohorts/corperreg:
 *   post:
 *     summary: Register a new corper
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Corper's first name
 *               lastName:
 *                 type: string
 *                 description: Corper's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Corper's email address
 *               phone:
 *                 type: string
 *                 description: Corper's phone number
 *               stateCode:
 *                 type: string
 *                 description: NYSC state code
 *     responses:
 *       201:
 *         description: Corper registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/corperreg", corpersReg);

/**
 * @swagger
 * /api/v1/cohorts/upgrade-admission:
 *   post:
 *     summary: Upgrade admission data
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID to upgrade
 *               upgradeData:
 *                 type: object
 *                 description: New admission data
 *     responses:
 *       200:
 *         description: Admission upgraded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/upgrade-admission", upgradeData);

/**
 * @swagger
 * /api/v1/cohorts/get-all-admissions:
 *   get:
 *     summary: Get all student admissions
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all admissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/get-all-admissions", getAdmissions);

/**
 * @swagger
 * /api/v1/cohorts/get-all-corpers:
 *   get:
 *     summary: Get all corper registrations
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all corpers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/get-all-corpers", getCorpers);

module.exports = router;
