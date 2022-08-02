const express = require("express");
const User = require("../models/userModel");

const vocabularyRouter = express.Router();

vocabularyRouter.post("/new", async (req, res) => {
  const { newWord, categoryName, username } = req.body;
  const user = await User.findOne({ username: username });

  const category = user.categories.filter((category) => {
    return category.name === categoryName;
  });

  const updatedCategory = category[0].words.push(newWord);

  const userCategories = user.categories;
  const index = userCategories.indexOf(category[0].name);

  if (index !== -1) {
    userCategories[index] = updatedCategory;
  }

  await User.findOneAndUpdate(
    { username: username },
    { categories: userCategories }
  );
});

vocabularyRouter.put("/remove/:word", async (req, res) => {
  const { removedWord, categoryName, username } = req.body;

  const user = await User.findOne({ username: username });

  const category = user.categories.filter((category) => {
    return category.name === categoryName;
  });
  let categoryWords = category[0].words;

  category[0].words.map((word) => {});
});

module.exports = vocabularyRouter;
