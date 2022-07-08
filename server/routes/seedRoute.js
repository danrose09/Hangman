const express = require("express");
const Word = require("../models/wordModel");
const Definition = require("../models/definitionModel");
const vocabulary = require("../data/vocabulary");
const definitions = require("../data/definitions");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Word.deleteMany({});
  const createdWords = await Word.insertMany(vocabulary);
  await Definition.deleteMany({});
  const createdDefinitions = await Definition.insertMany(definitions);
  res.json(createdDefinitions);
});

module.exports = seedRouter;
