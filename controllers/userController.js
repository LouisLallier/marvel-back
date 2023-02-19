const UserModel = require("../models/User");

module.exports.addFav = async (req, res) => {
  try {
    const { userId, id, picturePath, title, pictureExt, description } =
      req.body;
    if (!userId || !id) {
      throw new Error({ code: 401, message: "missing params" });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error({
        code: 404,
        message: `no user found for this id: ${userId}`,
      });
    }

    if (id) {
      user.favorites.map((fav) => {
        if (fav.comicId === id) {
          res
            .status(400)
            .json(`${id} is already in ${user.username}'s favorites`);
        }
      });
      const newFav = {
        comicId: id,
        picturePath,
        pictureExt,
        title,
        description,
      };
      user.favorites.push(newFav);
      await user.save();
      res
        .status(200)
        .json(`${id} bas been added to ${user.username} favorites`);
    }
  } catch (e) {
    console.log("catch");
    res.status(400).json({ message: e.message });
  }
};

module.exports.removeFav = async (req, res) => {
  try {
    const { userId, id } = req.body;

    if (userId && id) {
      const user = await UserModel.findById(userId);
      const newTab = [...user.favorites];
      user.favorites.map((fav, index) => {
        console.log(fav.comicId);
        console.log(id);
        if (fav.comicId === id) {
          console.log(index);
          return newTab.splice(index, 1);
        }
      });
      user.favorites = newTab;
      await user.save();
      res
        .status(200)
        .json(`${id} bas been removed from ${user.username} favorites`);
      // console.log(user.favorites);
    } else {
      return;
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
