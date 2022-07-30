const express = require("express");
const User = require("../models/userModel");

const deleteRouter = express.Router();

deleteRouter.put(`/:username/:word`, async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const newDictionary = user.dictionary.filter((term) => {
    return term.word !== req.params.word;
  });

  await User.findOneAndUpdate(
    { username: req.params.username },
    { dictionary: newDictionary }
  );
});

module.exports = deleteRouter;
