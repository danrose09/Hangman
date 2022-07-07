const { allowedNodeEnvironmentFlags } = require("process");

const vocabulary = [
  {
    name: "animals",
    words: [
      "elephant",
      "tiger",
      "lion",
      "eagle",
      "panda",
      "snake",
      "mouse",
      "cat",
      "dog",
      "rabbit",
    ],
  },

  {
    name: "colors",
    words: [
      "white",
      "black",
      "red",
      "green",
      "blue",
      "orange",
      "yellow",
      "purple",
      "brown",
      "pink",
    ],
  },

  {
    name: "food",
    words: [
      "hamburger",
      "bagel",
      "lollipop",
      "cookies",
      "waffle",
      "banana",
      "spaghetti",
      "juice",
      "soup",
      "coffee",
    ],
  },
];

module.exports = vocabulary;
