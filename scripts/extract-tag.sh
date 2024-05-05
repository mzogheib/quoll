#!/bin/bash

# A script to extract the semver version from a git tag.
# For example, @quoll/some-package@1.2.3 --> 1.2.3

tag=$1

if [[ ! "$tag" =~ ^@[^@]+/[^@]+@[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Input string must be in the format '@<namespace>/<name>@<semver-version>'"
    # exit 1
fi

version=$(echo "$tag" | sed 's/.*@[^@]*@\([^@]*\)/\1/')

echo "$version"
