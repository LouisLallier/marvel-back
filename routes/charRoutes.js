const express = require("express");
const { marvelAPI } = require("../apis");
const router = express.Router();

router.get("/chars", async (req, res) => {
  const { limit: limit1, skip: skip1, name: name1 } = req.query;
  let limitChars = limit1;
  let skipChars = skip1;
  let name = name1;

  if (!limitChars) {
    limitChars = "";
  }
  if (!skipChars) {
    skipChars = "";
  }
  if (!name) {
    name = "";
  }
  try {
    const response = await marvelAPI.get(
      `/characters?limit=${limitChars}&skip=${skipChars}&name=${name}`
    );
    const chars = response.data;
    res.status(200).json(chars);
    console.log(response.data);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/char/:id", async (req, res) => {
  try {
    const thisCharId = req.params.id;
    console.log(thisCharId);

    if (thisCharId) {
      const response = await marvelAPI.get(`/character/${thisCharId}`);
      res.status(200).json(response.data);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
