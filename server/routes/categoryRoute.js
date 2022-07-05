const express = require("express");
const Word = require("../models/wordModel");

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  const categories = await Word.find({});
  res.json(categories);
});

module.exports = categoryRouter;
