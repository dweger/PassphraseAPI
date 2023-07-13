<?php
$passphraseCount = $_POST['passphraseCount'];

// Execute the Bash script to generate passphrases
$command = './generate_passphrases.sh ' . escapeshellarg($passphraseCount);
$passphrases = shell_exec($command);

// Split the passphrases by newline character into an array
$passphraseArray = explode("\n", trim($passphrases));

// Return the passphrases as JSON
header('Content-Type: application/json');
echo json_encode($passphraseArray);
?>
