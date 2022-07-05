const express = require("express");
const Word = require("../models/wordModel");
const vocabulary = require("../data/vocabulary");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Word.deleteMany({});
  const createdWords = await Word.insertMany(vocabulary);
  res.json(createdWords);
});

module.exports = seedRouter;
