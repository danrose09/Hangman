const express = require("express");
const User = require("../models/userModel");

const updateRouter = express.Router();

updateRouter.put("/:word", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const word = user.dictionary.filter((term) => {
    return term.word === req.params.word;
  });

  const updatedWord = {
    word: req.body.word,
    partOfSpeech: req.body.partOfSpeech,
    origin: req.body.origin,
    definition: req.body.definition,
  };

  // const updatedDefinition = await Definition.findOneAndUpdate(
  //   { word: req.params.word },
  //   {
  //     word: req.body.word,
  //     partOfSpeech: req.body.partOfSpeech,
  //     origin: req.body.origin,
  //     definition: req.body.definition,
  //   }
  // );
});

// updateRouter.put("/:word", async (req, res) => {
//   const updatedDefinition = await Definition.findOneAndUpdate(
//     { word: req.params.word },
//     {
//       word: req.body.word,
//       partOfSpeech: req.body.partOfSpeech,
//       origin: req.body.origin,
//       definition: req.body.definition,
//     }
//   );

//   console.log(updatedDefinition);
// });

module.exports = updateRouter;
