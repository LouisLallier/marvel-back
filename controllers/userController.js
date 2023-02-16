const UserModel = require("../models/User");

module.exports.addFav = async (req, res) => {
  try {
    const { userId, comicId } = req.params;

    if (userId && comicId) {
      const user = await UserModel.findById(userId);
      console.log(user);
      if (!user.favorites.includes(comicId)) {
        user.favorites.push(comicId);
        await user.save();
        res
          .status(200)
          .json(`${comicId} bas been added to ${user.username} favorites`);
      } else {
        res
          .status(400)
          .json(`${comicId} is already in ${user.username}'s favorites`);
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports.removeFav = async (req, res) => {
  try {
    const { userId, comicId } = req.params;

    if (userId && comicId) {
      const user = await UserModel.findById(userId);
      console.log(user);
      if (user.favorites.includes(comicId)) {
        const index = user.favorites.indexOf(comicId);
        user.favorites.splice(index, 1);
        await user.save();
        res
          .status(200)
          .json(`${comicId} bas been removed from ${user.username} favorites`);
      } else {
        res
          .status(400)
          .json(`${comicId} is not in ${user.username}'s favorites`);
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
