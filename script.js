// script.js
document.addEventListener("DOMContentLoaded", () => {
  const passphraseContainer = document.getElementById("passphraseContainer");
  const generateButton = document.getElementById("generateButton");
  const numPassphrasesInput = document.getElementById("numPassphrases");

  function generatePassphrases() {
    let numPassphrases = parseInt(numPassphrasesInput.value);
    
    // Limit the number of passphrases to a maximum of 10
    numPassphrases = Math.min(numPassphrases, 10);

    // Fetch data from the API on port 3000
    fetch(`http://192.168.10.42:3000/api/generate?numPassphrases=${numPassphrases}`)
      .then((response) => response.json())
      .then((data) => {
        passphraseContainer.innerHTML = ""; // Clear previous results
        const passphrases = data.passphrases;

        // Display generated passphrases
        passphrases.forEach((passphrase) => {
          const passphraseElement = document.createElement("p");
          passphraseElement.textContent = passphrase;
          passphraseContainer.appendChild(passphraseElement);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  generateButton.addEventListener("click", generatePassphrases);

  // Add event listener to the input field for dynamic changes
  numPassphrasesInput.addEventListener("change", generatePassphrases);
});
