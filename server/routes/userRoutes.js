const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../token.js");

const userRouter = express.Router();

//Sign Up
userRouter.post("/signup", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    dictionary: [
      {
        word: "shrieve",
        partOfSpeech: "noun",
        origin: "Old English",
        definition: "an archaic term for sheriff",
      },
      {
        word: "clupeoid",
        partOfSpeech: "adjective",
        origin: "Latin",
        definition:
          "a marine fish of a group that includes the herring family together with the anchovies and related fish.",
      },
    ],
    categories: [
      {
        name: "animals",
        words: [
          "elephant",
          "tiger",
          "lion",
          "eagle",
          "panda",
          "snake",
          "mouse",
          "cat",
          "dog",
          "rabbit",
        ],
      },

      {
        name: "colors",
        words: [
          "white",
          "black",
          "red",
          "green",
          "blue",
          "orange",
          "yellow",
          "purple",
          "brown",
          "pink",
        ],
      },

      {
        name: "food",
        words: [
          "hamburger",
          "bagel",
          "lollipop",
          "cookies",
          "waffle",
          "banana",
          "spaghetti",
          "juice",
          "soup",
          "coffee",
        ],
      },
    ],
  });

  const user = await newUser.save();

  res.send({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    dictionary: user.dictionary,
    categories: user.categories,
    token: generateToken(user),
  });
});

//Login
userRouter.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: generateToken(user),
      });
    } else {
      return res.status(401).send({ msg: "Invalid credentials" });
    }
  } else {
    return res.status(401).send({ msg: "Invalid credentials" });
  }
});

module.exports = userRouter;
