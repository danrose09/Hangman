const express = require("express");
const User = require("../models/userModel");
const users = require("../data/users");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await User.deleteMany({});
  const createdUsers = await User.insertMany(users);

  res.json(createdUsers);
});

module.exports = seedRouter;
