const express = require("express");
const {
  joinWaitlist,
  getWaitlist,
  deleteWaitlistEntry,
} = require("../controllers/waitlist.controller");
const router = express.Router();

/**
 * @swagger
 * /api/v1/waitlist/join:
 *   post:
 *     summary: Join the waitlist
 *     tags: [Waitlist]
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
 *                 description: Email address to add to waitlist
 *     responses:
 *       201:
 *         description: Successfully joined waitlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Waitlist'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/join", joinWaitlist);

/**
 * @swagger
 * /api/v1/waitlist:
 *   get:
 *     summary: Get all waitlist entries (admin only)
 *     tags: [Waitlist]
 *     responses:
 *       200:
 *         description: List of all waitlist entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Waitlist'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getWaitlist);

/**
 * @swagger
 * /api/v1/waitlist/{id}:
 *   delete:
 *     summary: Delete a waitlist entry (admin only)
 *     tags: [Waitlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Waitlist entry ID to delete
 *     responses:
 *       200:
 *         description: Waitlist entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Waitlist entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", deleteWaitlistEntry);

module.exports = router;
