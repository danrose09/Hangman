const express = require("express");
const Definition = require("../models/definitionModel");

const dictionaryRouter = express.Router();

dictionaryRouter.get("/", async (req, res) => {
  const myDictionary = await Definition.find({});
  myDictionary
    ? res.json(myDictionary)
    : res.status(404).send({ msg: "Dictionary not found..." });
});

module.exports = dictionaryRouter;
