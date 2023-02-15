const express = require("express");
const router = express.Router();
const axios = require("axios");
// `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`,

router.get("/comics", async (req, res) => {
  let { apiKey, limit, skip, title } = await req.query;
  console.log(apiKey);
  console.log(limit);
  if (!limit) {
    limit = "";
  }
  if (!skip) {
    skip = "";
  }
  if (!title) {
    title = "";
  }
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&limit=${limit}&skip=${skip}&title=${title}`
    );
    const comics = response.data;
    res.status(200).json(comics);
    console.log(response.data);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
// 5fcf91f4d8a2480017b91453
router.get("/comics/:id", async (req, res) => {
  try {
    const { apiKey } = req.query;
    const comicId = req.params.id;
    console.log(comicId);
    console.log(apiKey);
    if (comicId) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${comicId}?apiKey=${apiKey}`
      );
      res.status(200).json(response.data);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
