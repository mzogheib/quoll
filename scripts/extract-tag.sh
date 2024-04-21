#!/bin/bash

# A script to extract the semver version from a git tag.
# For example, @quoll/some-package@1.2.3 --> 1.2.3

# Function to check if the input string matches the required format
validate_input() {
    if [[ ! "$1" =~ ^@[^@]+/[^@]+@[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "Error: Input string must be in the format '@<namespace>/<name>@<semver-version>'"
        exit 1
    fi
}

# Validate the input format
validate_input "$1"

# Extract the version using sed
version=$(echo "$1" | sed 's/.*@[^@]*@\([^@]*\)/\1/')

echo "$version"
