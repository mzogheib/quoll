#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const npmScope = "@quoll/";

// Set up the base directory (root of the monorepo)
const rootDir = path.resolve(__dirname, ".."); // Go up one level from `scripts/`

// Helper function to resolve the path to a package's `package.json`
function getPackageJson(packageName) {
  const packageDir = path.join(
    rootDir,
    "packages",
    packageName.replace(npmScope, ""),
  );
  return require(path.join(packageDir, "package.json"));
}

// Helper function to check if a package has been built (i.e., if the `dist` folder exists)
function isPackageBuilt(packageName) {
  const packageDir = path.join(
    rootDir,
    "packages",
    packageName.replace(npmScope, ""),
  );
  const distPath = path.join(packageDir, "dist");
  return fs.existsSync(distPath);
}

// Recursive function to gather all dependencies that need building
function getDependenciesToBuild(packageName, visited = new Set()) {
  if (visited.has(packageName)) return [];
  visited.add(packageName);

  const packageJson = getPackageJson(packageName);
  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};
  const allDependencies = { ...dependencies, ...devDependencies };

  let packagesToBuild = [];

  for (const depName of Object.keys(allDependencies)) {
    if (
      !depName.startsWith(npmScope) ||
      isPackageBuilt(depName) ||
      visited.has(depName) // May be a dependency of another package that's already been visited
    ) {
      continue;
    }

    packagesToBuild.push(depName);

    packagesToBuild = packagesToBuild.concat(
      getDependenciesToBuild(depName, visited),
    );
  }

  return packagesToBuild;
}

// Main function to start the build process
function buildDependencies() {
  // Start at the package from which the script is run
  const packageDir = process.cwd();
  const packageJson = require(path.join(packageDir, "package.json"));
  const packageName = packageJson.name;

  // Ensure that the current package is part of the workspace
  if (!packageName.startsWith(npmScope)) {
    console.error(
      `Package ${packageName} is not in the ${npmScope} workspace. Aborting.`,
    );
    process.exit(1);
  }

  const packagesToBuild = getDependenciesToBuild(packageName);

  if (packagesToBuild.length === 0) return;

  // Create the yarn workspaces foreach command
  const includeFlags = packagesToBuild
    .map((pkg) => `--include ${pkg}`)
    .join(" ");
  const command = `yarn workspaces foreach -Rt ${includeFlags} run build`;

  console.log("Building dependencies...");

  // Run the command
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to build packages: ${error.message}`);
    process.exit(1);
  }
}

buildDependencies();
