const express = require("express");
const User = require("../models/userModel");

const deleteCategoryRouter = express.Router();

deleteCategoryRouter.put("/", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const newCategories = user.categories.filter((category) => {
    return category.name !== req.body.category;
  });

  const updatedUser = await User.findOneAndUpdate(
    { username: req.body.username },
    { categories: newCategories }
  );
  console.log(updatedUser);
  res.json(newCategories);
  return res.status(201);
});

module.exports = deleteCategoryRouter;
