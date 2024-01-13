#!/bin/bash

options=("api" "client-mobile" "client-web" "ui-components")
selected_option=0  # Initialize with the default value

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

case "${options[selected_option]}" in
    "api")
        echo "Executing script for api"
        # Add your api script here
        ;;
    "client-mobile")
        echo "Executing script for client-mobile"
        # Add your client-mobile script here
        ;;
    "client-web")
        echo "Executing script for client-web"
        # Add your client-web script here
        ;;
    "ui-components")
        echo "Executing script for ui-components"
        # Add your ui-components script here
        ;;
esac
