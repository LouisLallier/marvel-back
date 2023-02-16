const express = require("express");
const router = express.Router();
const axios = require("axios");
// `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`,

router.get("/comics", async (req, res) => {
  let { limit, skip, title } = await req.query;

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
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
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
    const charId = req.params.id;
    console.log(charId);
    console.log(apiKey);
    if (charId) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${charId}?apiKey=${process.env.API_KEY}`
      );
      res.status(200).json(response.data);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
