const express = require("express");
const Definition = require("../models/definitionModel");

const updateRouter = express.Router();

updateRouter.put("/:word", async (req, res) => {
  const updatedDefinition = await Definition.findOneAndUpdate(
    { word: req.params.word },
    {
      word: req.body.word,
      partOfSpeech: req.body.partOfSpeech,
      origin: req.body.origin,
      definition: req.body.definition,
    }
  );

  console.log(updatedDefinition);
});

module.exports = updateRouter;
