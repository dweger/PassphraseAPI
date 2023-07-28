const express = require("express");
const cors = require("cors"); // Import the cors module

const app = express();
app.use(cors()); // Enable CORS for all routes

const fs = require("fs");

function getRandomWord() {
  const words = fs.readFileSync("dictionary.txt", "utf8").split("\n");
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].trim(); // Remove any leading/trailing spaces
}

app.get("/api/generate", (req, res) => {
  const numPassphrases = parseInt(req.query.numPassphrases) || 5;
  const passphrases = [];
  for (let i = 0; i < numPassphrases; i++) {
    const passphrase = `${getRandomWord()}${Math.floor(Math.random() * 100)}${getRandomWord()}${Math.floor(Math.random() * 100)}${getRandomWord()}`;
    passphrases.push(passphrase);
  }
  res.json({ passphrases });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
