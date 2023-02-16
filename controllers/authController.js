const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: 180000000000000,
  });
};

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

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      console.log(auth);
      if (auth) {
        const token = createToken(user._id);
        if (token) {
          res.status(201).json({ token, user });
        }
      } else {
        res.status(400).json("wrong password");
      }
    } else {
      res.status(400).json("wrong email");
    }
    console.log(user);
  } catch (e) {
    console.log(e);
    res.status(401).json({ e });
  }
};
