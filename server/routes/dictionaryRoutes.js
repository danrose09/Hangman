const express = require("express");
const User = require("../models/userModel");
const protect = require("../middleware/authMiddleware");

const dictionaryRouter = express.Router();

dictionaryRouter.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const myDictionary = user.dictionary;

  user
    ? res.json(myDictionary)
    : res.status(404).send({ msg: "user not found..." });
});

module.exports = dictionaryRouter;
