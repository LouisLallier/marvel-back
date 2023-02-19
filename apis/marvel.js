const axios = require("axios");

const marvelAPI = axios.create({
  baseURL: "https://lereacteur-marvel-api.herokuapp.com",
  params: {
    apiKey: process.env.API_KEY,
  },
});

module.exports = marvelAPI;
