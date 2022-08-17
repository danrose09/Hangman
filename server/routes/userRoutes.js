const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../token.js");
const protect = require("../middleware/authMiddleware.js");

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
        word: "shrive",
        partOfSpeech: "verb",
        origin: "English",
        definition: "to free from guilt",
      },
      {
        word: "wreak",
        partOfSpeech: "verb",
        origin: "Old English",
        definition: "bring about, cause",
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
    createdAt: user.createdAt,
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
        createdAt: user.createdAt,
        token: generateToken(user),
      });
    } else {
      return res.status(401).send({ msg: "Invalid credentials" });
    }
  } else {
    return res.status(401).send({ msg: "Invalid credentials" });
  }
});

//Get User Account
userRouter.get("/account/:username", protect, async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const myDictionary = user.dictionary;
  const activeSince = user.createdAt;
  res.json({
    user,
    myDictionary,
    activeSince,
  });
});

//Edit User Account Details
userRouter.post("/edit-account", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { username: req.body.username },
    {
      username: req.body.newUsername,
      email: req.body.newEmail,
    },
    {
      new: true,
    }
  );
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
    token: generateToken(user),
  });
});

userRouter.post("/delete-account", async (req, res) => {
  const user = await User.findOneAndDelete({ username: req.body.username });
  const users = await User.find();
  res.json(users);
});

module.exports = userRouter;
