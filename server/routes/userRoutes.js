const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../token");

const userRouter = express.Router();

//sign up
userRouter.post("/signup", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  const user = await newUser.save();
  console.log(user);
  res.send({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    token: generateToken(user),
  });
});

module.exports = userRouter;
