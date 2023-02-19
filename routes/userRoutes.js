const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

/// authentification AUTH CONTROLLER
router.post("/signup", fileUpload(), authController.signUp);
router.post("/signin", authController.signIn);
router.get("/info/:id", authController.userInfo);

/// HANDLE FAVORITES
router.put("/addfav", userController.addFav);
router.put("/remove", userController.removeFav);

module.exports = router;
