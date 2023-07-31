const fs = require("fs");
const path = require("path");

module.exports = async function (context, req) {
  const numPassphrases = parseInt(req.query.numPassphrases) || 5;
  const passphrases = [];
  const dictionaryPath = path.join(context.executionContext.functionDirectory, "dictionary.txt");

  function getRandomWord() {
    const words = fs.readFileSync(dictionaryPath, "utf8").split("\n");
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].trim(); // Remove any leading/trailing spaces
  }

  for (let i = 0; i < numPassphrases; i++) {
    const passphrase = `${getRandomWord()}${Math.floor(Math.random() * 100)}${getRandomWord()}${Math.floor(Math.random() * 100)}${getRandomWord()}`;
    passphrases.push(passphrase);
  }

  context.res = {
    body: { passphrases },
  };
};