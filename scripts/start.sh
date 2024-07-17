#!/bin/bash

emojis=("🗄️ " "🗃️ " "🧰" "📱" "🌐" "🔩" "🧩" "🎨")
options=("db" "api" "client-lib" "client-mobile" "client-web" "lib" "ui-components" "ui-primitives")
selected_option=0

while true; do
    clear
    echo "Select a script to run:"

    for ((i=0; i<${#options[@]}; i++)); do
        option=${options[i]}
        emoji=${emojis[i]}

        if [ "$i" -eq "$selected_option" ]; then
            echo "* $emoji $option"
        else
            echo "  $emoji $option"
        fi
    done

    echo ""
    echo "q: quit"

    read -rsn1 key

    case "$key" in
        "q")  # Quit
            exit 0
            ;;
        "A")  # Arrow Up
            ((selected_option--))
            [ "$selected_option" -lt 0 ] && selected_option=$((${#options[@]} - 1))
            ;;
        "B")  # Arrow Down
            ((selected_option++))
            [ "$selected_option" -ge "${#options[@]}" ] && selected_option=0
            ;;
        "")   # Enter key
            break
            ;;
    esac
done

selected_option_label="${options[selected_option]}"
selected_option_emoji="${emojis[selected_option]}"

clear

echo "Running "${selected_option_emoji}" "${selected_option_label}"..."

# db has a non-standard start script
if [ "$selected_option_label" == "db" ]; then
    yarn workspace @quoll/api start-db
    exit 0
fi

yarn workspace @quoll/${selected_option_label} start
