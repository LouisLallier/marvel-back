const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/// authentification AUTH CONTROLLER
router.post("/signup", authController.signUp);

module.exports = router;
