const express = require("express");
const User = require("../models/userModel");

const vocabularyRouter = express.Router();

vocabularyRouter.post("/new", async (req, res) => {
  const { newWord, categoryName, username } = req.body;
  const user = await User.findOne({ username: username });

  const category = user.categories.filter((category) => {
    return category.name === categoryName;
  });

  category[0].words.push(newWord);
  const updatedCategory = category;
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
  const categoryWords = category[0].words;

  const updatedCategory = {
    name: category[0].name,
    words: categoryWords.filter((word) => {
      return word !== removedWord;
    }),
  };

  const userCategories = user.categories;
  const index = userCategories.indexOf(category[0]);

  if (index !== -1) {
    userCategories[index] = updatedCategory;

    await User.findOneAndUpdate(
      { username: username },
      { categories: userCategories }
    );
  }
});

module.exports = vocabularyRouter;
