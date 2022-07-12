const express = require("express");
const Definition = require("../models/definitionModel");

const definitionRouter = express.Router();

definitionRouter.post("/addtomydictionary", async (req, res) => {
  const addedDefinition = await new Definition({
    word: req.body.word,
    partOfSpeech: req.body.partOfSpeech,
    origin: req.body.origin,
    definition: req.body.definition,
  });

  const def = addedDefinition.save();
  res.send(def);
  console.log(def);
});

definitionRouter.put("/update/:word", async (req, res) => {
  const updateDefinition = await Definition.findOneAndUpdate({
    word: req.params.word,
  });
});

module.exports = definitionRouter;
