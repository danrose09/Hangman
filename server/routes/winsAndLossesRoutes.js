const express = require("express");
const User = require("../models/userModel");

const winsAndLossesRouter = express.Router();

winsAndLossesRouter.put("/wins-losses", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { username: req.body.username },
    { winsAndLosses: req.body.winsAndLosses }
  );
  console.log(user);
  res.send(user.winsAndLosses);
});

winsAndLossesRouter.get("/wins-losses/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.send(user.winsAndLosses);
});

module.exports = winsAndLossesRouter;
