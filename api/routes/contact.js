const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contact");
const authenticate = require("../middleware/authenticate");

// Routes

router.get("/", authenticate, contactController.getAllContactsController); // Get all data

router.get("/:id", contactController.getOneContactController); // Get one data

router.post("/", authenticate, contactController.createContactController); // Create data

router.put("/:id", authenticate, contactController.updateContactController); // Update data

router.delete("/:id", authenticate, contactController.deleteContactController); // Delete data

module.exports = router;
