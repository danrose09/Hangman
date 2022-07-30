const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Daniel",
    email: "12345@gmail.com",
    username: "danrose",
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
  },
];

module.exports = users;
