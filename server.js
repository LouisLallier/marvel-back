require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const comicsRoutes = require("./routes/comicsRoutes");
const charRoutes = require("./routes/charRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());

app.use(express.json());
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URI);

app.use(comicsRoutes);
app.use(charRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Serveur is running on PORT : ${process.env.PORT}`);
});
