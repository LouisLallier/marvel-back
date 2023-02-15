const mongoose = require("mongoose");
const { isEmail } = require("validator");

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 35,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 300,
    minlength: 6,
  },
  picture: {
    type: String,
    default: "// NO PICTURE HERE \\",
  },
  favorites: {
    default: [],
    type: Array,
  },
});

module.exports = User;
