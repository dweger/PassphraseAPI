#!/bin/bash

function generate_secure_passphrase() {
    local count=$1
    local words_file="path/to/english/words.txt" # Replace with the path to your English words file

    words=()
    while IFS= read -r line; do
        words+=("$line")
    done < "$words_file"

    secure_passphrases=()

    for ((i = 1; i <= count; i++)); do
        passphrase=""
        passphrase+="$(shuf -n 1 <<< "${words[@]}")"
        passphrase+="$(shuf -i 10-99 -n 1)"
        passphrase+="$(shuf -n 1 <<< "${words[@]}")"
        passphrase+="$(shuf -i 10-99 -n 1)"
        passphrase+="$(shuf -n 1 <<< "${words[@]}")"

        secure_passphrases+=("$passphrase")
    done

    printf '%s\n' "${secure_passphrases[@]}"
}

passphrase_count=5
passphrases=$(generate_secure_passphrase "$passphrase_count")

echo "Secure Passphrases:"
echo "$passphrases"
