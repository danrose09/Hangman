const express = require("express");
const User = require("../models/userModel");

const deleteDictionaryTermRouter = express.Router();

deleteDictionaryTermRouter.put(`/:username/:word`, async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const newDictionary = user.dictionary.filter((term) => {
    return term.word !== req.params.word;
  });

  const updatedUser = await User.findOneAndUpdate(
    { username: req.params.username },
    { dictionary: newDictionary }
  );
  res.json(newDictionary);
  return res.status(201);
});

module.exports = deleteDictionaryTermRouter;
