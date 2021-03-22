const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const authenticate = require('../middleware/authenticate')

// Routes

router.post("/login", userController.loginController); // Login user

router.post("/register", userController.registerController); // Register new user

router.get("/", authenticate, userController.getUsers); // All users

// Exports

module.exports = router;
