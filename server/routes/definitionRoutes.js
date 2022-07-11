const express = require("express");
const Definition = require("../models/definitionModel");

const definitionRouter = express.Router();

definitionRouter.post("/addtomydictionary/:word", async (req, res) => {
  const addedDefinition = await new Definition({
    word: req.body.word,
    partOfSpeech: req.body.partOfSpeech,
    origin: req.body.origin,
    definitino: req.body.newDefinition,
  });
  console.log(addedDefinition);
  addedDefinition.save();
});

module.exports = definitionRouter;
