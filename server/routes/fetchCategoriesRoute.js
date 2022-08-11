const express = require("express");
const User = require("../models/userModel");

const fetchCategoriesRouter = express.Router();

fetchCategoriesRouter.get("/:username/", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  res.json(user.categories);
});

module.exports = fetchCategoriesRouter;
