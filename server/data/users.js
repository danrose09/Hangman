const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Daniel",
    email: "12345@gmail.com",
    username: "danrose",
    password: bcrypt.hashSync("12345", 10),
    dictionary: [
      {
        word: "shrive",
        partOfSpeech: "verb",
        origin: "English",
        definition: "to free from guilt",
      },
      {
        word: "wreak",
        partOfSpeech: "verb",
        origin: "Old English",
        definition: "bring about, cause",
      },
    ],
    categories: [
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
        icon: "fa-solid fa-elephant",
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
        icon: "fa-solid fa-elephant",
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
        icon: "fa-solid fa-elephant",
      },
    ],
    winsAndLosses: {
      wins: 10,
      losses: 5,
    },
  },
  {
    name: "Bob Dole",
    email: "bd@gmail.com",
    username: "bobdole",
    password: bcrypt.hashSync("12345", 10),
    dictionary: [
      {
        word: "shrieve",
        partOfSpeech: "noun",
        origin: "Old English",
        definition: "an archaic term for sheriff",
      },
      {
        word: "clupeoid",
        partOfSpeech: "adjective",
        origin: "Latin",
        definition:
          "a marine fish of a group that includes the herring family together with the anchovies and related fish.",
      },
    ],
    categories: [
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
        icon: "fa-solid fa-elephant",
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
        icon: "fa-solid fa-elephant",
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
        icon: "fa-solid fa-elephant",
      },
    ],
  },
];

module.exports = users;
