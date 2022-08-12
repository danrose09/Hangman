const express = require("express");
const User = require("../models/userModel");

const addCategoryRouter = express.Router();

addCategoryRouter.put("/", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { username: req.body.username },
    {
      $push: {
        categories: {
          name: req.body.categoryName,
          words: [],
        },
      },
    }
  );
});

module.exports = addCategoryRouter;
