const express = require("express");
const cors = require("cors");
const seedRouter = require("./routes/seedRoute.js");
const categoryRouter = require("./routes/categoryRoute.js");
const vocabularyRouter = require("./routes/vocabulayRoutes.js");
const dictionaryRouter = require("./routes/dictionaryRoutes.js");
const definitionRouter = require("./routes/definitionRoutes.js");
const updateRouter = require("./routes/updateRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const deleteRouter = require("./routes/deleteRoutes.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { dbName: "word_db" }, (err) => {
  err ? console.log(err) : console.log("Mongodb Connected Succesfully!");
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/api/seed", seedRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/vocabulary", vocabularyRouter);
app.use("/api/mydictionary", dictionaryRouter);
app.use("/api/definitions", definitionRouter);
app.use("/api/update", updateRouter);
app.use("/api/users", userRouter);
app.use("/api/delete", deleteRouter);

app.listen(5000, (req, res) => {
  console.log("App is running on 5000!");
});
