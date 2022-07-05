const express = require("express");
const Word = require("../models/wordModel");

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  const categories = await Word.find({});
  res.json(categories);
});

categoryRouter.get("/:name", async (req, res) => {
  const { name } = req.params;
  const category = await Word.findOne({ name: name });
  category
    ? res.json(category)
    : res.status(404).send({ msg: "Category not found..." });
});

module.exports = categoryRouter;
