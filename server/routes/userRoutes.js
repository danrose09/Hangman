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
  });

  const user = await newUser.save();

  res.send({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    token: generateToken(user),
  });
  console.log(user);
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
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

module.exports = userRouter;
