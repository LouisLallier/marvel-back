const express = require("express");
const comicsRoutes = require("./routes/comicsRoutes");
const charRoutes = require("./routes/charRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(comicsRoutes);
app.use(charRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Serveur is running on PORT : ${process.env.PORT}`);
});
