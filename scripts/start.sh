#!/bin/bash

emojis=("🗃️ " "🧰" "📱" "🌐" "🧩" "🎨")
options=("api" "client-lib" "client-mobile" "client-web" "ui-components" "ui-primitives")
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
    echo "(type q to quit)"

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

node scripts/start.js "${selected_option_label}"
