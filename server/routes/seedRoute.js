const express = require("express");
const Word = require("../models/wordModel");
const Definition = require("../models/definitionModel");
const User = require("../models/userModel");
const vocabulary = require("../data/vocabulary");
const definitions = require("../data/definitions");
const users = require("../data/users");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await User.deleteMany({});
  const createdUsers = await User.insertMany(users);
  await Word.deleteMany({});
  const createdWords = await Word.insertMany(vocabulary);
  // await Definition.deleteMany({});
  // const createdDefinitions = await Definition.insertMany(definitions);
  res.json(createdUsers);
});

module.exports = seedRouter;
