const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");

module.exports.signUp = async (req, res) => {
  try {
    const { username, email, password, pictureUrl } = req.body;
    const saltRounds = 10;

    const user = await UserModel.findOne({ email: email, username: username });
    if (user) {
      res
        .status(409)
        .json({ message: "This email/username already has an account" });
    } else {
      if (username && email && password) {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          const user = await UserModel.create({
            username,
            email,
            password: hash,
            pictureUrl,
          });
          console.log(user);
          res.status(201).json(user);
        });
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
