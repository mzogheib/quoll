#!/bin/bash

options=("api" "client-mobile" "client-web" "ui-components")
selected_option=0

while true; do
    clear
    echo "Select a script to run:"
    for ((i=0; i<${#options[@]}; i++)); do
        if [ "$i" -eq "$selected_option" ]; then
            echo "* ${options[i]}"
        else
            echo "  ${options[i]}"
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

echo "Running "${selected_option_label}"..."

node scripts/start.js "${selected_option_label}"
