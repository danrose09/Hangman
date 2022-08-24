const express = require("express");
const cors = require("cors");
const seedRouter = require("./routes/seedRoute.js");
const fetchCategoriesRouter = require("./routes/fetchCategoriesRoute.js");
const fetchCategoryRouter = require("./routes/fetchCategoryRoute.js");
const addCategoryRouter = require("./routes/addCategoryRoute.js");
const deleteCategoryRouter = require("./routes/deleteCategoryRoute.js");
const fetchCommonWordRouter = require("./routes/fetchCommonWordRoute.js");
const vocabularyRouter = require("./routes/vocabulayRoutes.js");
const fetchDictionaryRouter = require("./routes/fetchDictionaryRoute.js");
const addToDictionaryRouter = require("./routes/addToDictionaryRoute.js");
const updateDictionaryTermRouter = require("./routes/updateDictionaryTermRoute.js");
const userRouter = require("./routes/userRoutes.js");
const deleteDictionaryTermRouter = require("./routes/deleteDictionaryTermRoute.js");
const winsAndLossesRouter = require("./routes/winsAndLossesRoutes.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { dbName: "word_db" }, (err) => {
  err ? console.log(err) : console.log("Mongodb Connected Succesfully!");
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/api/seed", seedRouter);
app.use("/api/categories", fetchCategoriesRouter);
app.use("/api/category", fetchCategoryRouter);
app.use("/api/add-category", addCategoryRouter);
app.use("/api/delete-category", deleteCategoryRouter);
app.use("/api/common-word", fetchCommonWordRouter);
app.use("/api/vocabulary", vocabularyRouter);
app.use("/api/mydictionary", fetchDictionaryRouter);
app.use("/api/definitions", addToDictionaryRouter);
app.use("/api/update", updateDictionaryTermRouter);
app.use("/api/users", userRouter);
app.use("/api/delete", deleteDictionaryTermRouter);
app.use("/api/statistics", winsAndLossesRouter);

app.listen(5000, (req, res) => {
  console.log("App is running on 5000!");
});
