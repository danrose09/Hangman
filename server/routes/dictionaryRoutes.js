const express = require("express");
const User = require("../models/userModel");
const protect = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");

const dictionaryRouter = express.Router();

dictionaryRouter.get("/:username", protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    const myDictionary = user.dictionary;
    res.json(myDictionary);
  } else {
    res.status(404).send({ msg: "user not found..." });
  }
});

module.exports = dictionaryRouter;
