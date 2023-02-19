const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: 180000000000000,
  });
};

module.exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const file = req.files.picture;
    console.log(file);
    const saltRounds = 10;

    const user = await UserModel.findOne({ email: email, username: username });
    if (user) {
      res
        .status(409)
        .json({ message: "This email/username already has an account" });
    } else {
      if (username && email && password) {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          const result = await cloudinary.uploader.upload(
            convertToBase64(file),
            { folder: `Marvel/user/${email}` }
          );

          const user = await UserModel.create({
            username,
            email,
            password: hash,
            pictureUrl: result.secure_url,
          });
          const token = createToken(user._id);

          res.status(201).json({ user, token });
          console.log(user);
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

      const token = createToken(user._id);
      res.status(201).json({ token, user });
    }
    console.log(user);
  } catch (e) {
    console.log(e);
    res.status(401).json({ e });
  }
};
module.exports.userInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
