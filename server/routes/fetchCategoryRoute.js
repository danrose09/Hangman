const express = require("express");
const User = require("../models/userModel");

const fetchCategoryRouter = express.Router();

fetchCategoryRouter.get("/:username/:name", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const category = user.categories.filter((category) => {
    return category.name === req.params.name;
  });

  category
    ? res.json(category[0])
    : res.status(404).send({ msg: "Category not found..." });
});

module.exports = fetchCategoryRouter;
