const express = require("express");
const cors = require("cors");
const seedRouter = require("./routes/seedRoute.js");
const categoryRouter = require("./routes/categoryRoute.js");
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

app.listen(5000, (req, res) => {
  console.log("App is running on 5000!");
});
