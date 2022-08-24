const express = require("express");
const uniqueCommonWords = require("../data/commonWords");

const fetchCommonWordRouter = express.Router();

fetchCommonWordRouter.get("/", (req, res) => {
  let commonWord =
    uniqueCommonWords[Math.floor(Math.random() * uniqueCommonWords.length)];
  console.log(commonWord);
  res.send(commonWord);
});

module.exports = fetchCommonWordRouter;
