const fs = require("fs");
const path = require("path");

module.exports = async function (context, req) {
  const numPassphrases = parseInt(req.query.numPassphrases) || 5;
  const numWords = parseInt(req.query.numWords) || 3;
  const lengthNumbers = parseInt(req.query.lengthNumbers) || 2;

  const passphrases = [];
  const dictionaryPath = path.join(context.executionContext.functionDirectory, "dictionary.txt");

  function getRandomWord() {
    const words = fs.readFileSync(dictionaryPath, "utf8").split("\n");
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].trim(); // Remove any leading/trailing spaces
  }

  function getRandomNumber(length) {
    const maxNumber = Math.pow(10, length) - 1;
    return String(Math.floor(Math.random() * maxNumber)).padStart(length, "0");
  }

  for (let i = 0; i < numPassphrases; i++) {
    const words = [];
    for (let j = 0; j < numWords; j++) {
      words.push(getRandomWord());
    }
    const passphrase = words.join("") + getRandomNumber(lengthNumbers);
    passphrases.push(passphrase);
  }

  context.res = {
    body: { passphrases },
  };
};
