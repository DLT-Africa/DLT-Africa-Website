const express = require("express");
const {
  contactUs,
  getAllContacts,
  getContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

/**
 * @swagger
 * /api/v1/contact/contactUs:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Contact person's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Contact email address
 *               message:
 *                 type: string
 *                 description: Contact message
 *     responses:
 *       201:
 *         description: Contact message submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/contactUs", contactUs);

/**
 * @swagger
 * /api/v1/contact/get-all-contacts:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: List of all contact messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/get-all-contacts", getAllContacts);

/**
 * @swagger
 * /api/v1/contact/getContact/{contactId}:
 *   get:
 *     summary: Get a single contact message by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact message ID
 *     responses:
 *       200:
 *         description: Contact message details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/getContact/:contactId", getContact);

/**
 * @swagger
 * /api/v1/contact/delete/{contactId}:
 *   delete:
 *     summary: Delete a contact message
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact message ID to delete
 *     responses:
 *       200:
 *         description: Contact message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Contact message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/delete/:contactId", deleteContact);

module.exports = router;
