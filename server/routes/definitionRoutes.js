const express = require("express");
const Definition = require("../models/definitionModel");
const User = require("../models/userModel");

const definitionRouter = express.Router();

definitionRouter.post("/addtomydictionary", async (req, res) => {
  const updateUserDictionary = await User.findOneAndUpdate(
    { username: req.body.username },
    {
      $push: {
        dictionary: {
          word: req.body.word,
          partOfSpeech: req.body.partOfSpeech,
          origin: req.body.origin,
          definition: req.body.definition,
        },
      },
    }
  );

  const update = updateUserDictionary.save();
  res.send(update);
  console.log(update);
});

definitionRouter.get("/:username/:word", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const word = user.dictionary.filter((term) => {
    return term.word === req.params.word;
  });

  res.send(word);
});

// definitionRouter.get("/:word", async (req, res) => {
//   const myDefinition = await Definition.findOne({
//     word: req.params.word,
//   });
//   res.send(myDefinition);
// });

module.exports = definitionRouter;
