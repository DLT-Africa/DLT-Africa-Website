const express = require("express");
const {
  contactUs,
  getAllContacts,
    getContact,
  deleteContact
} = require("../controllers/contactController");
const router = express.Router();

router.post("/contactUs", contactUs);
router.get("/get-all-contacts", getAllContacts);
router.get("/getContact/:contactId", getContact);
router.delete("/delete/:contactId", deleteContact);


module.exports = router;
