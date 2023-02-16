const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

/// authentification AUTH CONTROLLER
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

/// HANDLE FAVORITES
router.put("/addfav/:userId/:comicId", userController.addFav);
router.put("/remove/:userId/:comicId", userController.removeFav);

module.exports = router;
