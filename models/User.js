const mongoose = require("mongoose");
const avatar = require("../assets/2709_R0lVIE5JQyA2MDctNDM.jpg");

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

    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 300,
    minlength: 6,
  },
  pictureUrl: {
    type: String,

    required: false,
  },
  favorites: {
    default: [],
    type: Array,
  },
});

module.exports = User;
