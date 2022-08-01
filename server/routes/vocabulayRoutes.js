const express = require("express");
const Word = require("../models/wordModel");
const User = require("../models/userModel");

const vocabularyRouter = express.Router();

vocabularyRouter.post("/new", async (req, res) => {
  const { newWord, name } = req.body;

  await Word.updateOne(
    { name: name },
    { $push: { words: newWord.toLowerCase() } }
  );
});

module.exports = vocabularyRouter;
