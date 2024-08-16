#!/bin/bash

# Extracts the workspace dependencies from package.json and builds them

extract_deps() {
  grep -E '"@quoll/[^"]+"\s*:\s*"' package.json |
  sed -E 's/.*"(@quoll\/[^"]+)".*/\1/'
}

deps=$(extract_deps)

for dep in $deps; do
  # Get the path to the package
  pkg_path=$(yarn workspace $dep exec pwd)

  # Check if dist folder exists
  if [ ! -d "$pkg_path/dist" ]; then
    echo "Building $dep"
    yarn workspace $dep run build
  fi

  echo "$dep built"
done
