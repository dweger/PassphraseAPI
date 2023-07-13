document.addEventListener("DOMContentLoaded", function() {
    var generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", generatePassphrases);
});

function generatePassphrases() {
    var passphraseCount = 5;

    // Execute the script and capture the output
    var passphrases = runScript(passphraseCount);

    var passphraseContainer = document.getElementById("passphraseContainer");
    passphraseContainer.innerHTML = ""; // Clear any existing passphrases

    // Display each passphrase in the container
    for (var i = 0; i < passphrases.length; i++) {
        var passphraseElement = document.createElement("div");
        passphraseElement.className = "passphrase";
        passphraseElement.textContent = passphrases[i];
        passphraseContainer.appendChild(passphraseElement);
    }
}

function runScript(passphraseCount) {
    // Perform an AJAX request to execute the script on the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "generate_passphrases.php", false); // Replace with the actual server-side script

    // Set the appropriate headers if needed
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Prepare the request body with the desired passphrase count
    var requestBody = "passphraseCount=" + encodeURIComponent(passphraseCount);

    // Send the request and capture the response
    xhr.send(requestBody);
    var response = xhr.responseText;

    // Parse the response as JSON (assuming the script returns JSON)
    var passphrases = JSON.parse(response);

    return passphrases;
}
