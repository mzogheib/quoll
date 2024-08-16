#!/bin/bash

# Extracts the workspace dependencies from package.json and builds them

extract_deps() {
  grep -E '"@quoll/[^"]+"\s*:\s*"' package.json |
  sed -E 's/.*"(@quoll\/[^"]+)".*/\1/'
}

deps=$(extract_deps)

for dep in $deps; do
  echo "Building $dep"
  yarn workspace $dep run build
done
