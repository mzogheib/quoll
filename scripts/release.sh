#!/bin/bash

if [ -z "$CI" ]; then
  echo "Error: This script should only be run in the CI server."
  exit 1
fi

cross-env lerna publish --message "chore: publish packages" --conventional-commits --yes
