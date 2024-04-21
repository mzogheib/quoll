#!/bin/bash

if [ -z "$CI" ]; then
  echo "Error: This script should only be run in the CI server."
  exit 1
fi

cross-env HUSKY_BYPASS=true lerna publish --conventional-commits --yes
