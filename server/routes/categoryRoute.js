const express = require("express");
const User = require("../models/userModel");

const categoryRouter = express.Router();

categoryRouter.get("/:username/", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  res.json(user.categories);
});

// categoryRouter.get("/:name", async (req, res) => {
//   const category = await Word.findOne({ name: req.params.name });
//   category
//     ? res.json(category)
//     : res.status(404).send({ msg: "Category not found..." });
// });

module.exports = categoryRouter;
