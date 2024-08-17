#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Set up the base directory (root of the monorepo)
const rootDir = path.resolve(__dirname, ".."); // Go up one level from `scripts/`

// Helper function to resolve the path to a package's `package.json`
function getPackageJson(packageName) {
  const packageDir = path.join(
    rootDir,
    "packages",
    packageName.replace("@quoll/", ""),
  );
  return require(path.join(packageDir, "package.json"));
}

// Helper function to check if a package has been built (i.e., if the `dist` folder exists)
function isPackageBuilt(packageName) {
  const packageDir = path.join(
    rootDir,
    "packages",
    packageName.replace("@quoll/", ""),
  );
  const distPath = path.join(packageDir, "dist");
  return fs.existsSync(distPath);
}

// Recursive function to gather all dependencies that need building
function getDependenciesToBuild(packageName, visited = new Set()) {
  if (visited.has(packageName)) return []; // Avoid circular dependencies
  visited.add(packageName);

  const packageJson = getPackageJson(packageName);
  const dependencies = packageJson.dependencies || {};
  let packagesToBuild = [];

  for (const depName of Object.keys(dependencies)) {
    // Only consider dependencies that are in the `@quoll/` namespace
    if (depName.startsWith("@quoll/")) {
      if (!isPackageBuilt(depName)) {
        packagesToBuild.push(depName);
        // Recurse to collect dependencies of this dependency
        packagesToBuild = packagesToBuild.concat(
          getDependenciesToBuild(depName, visited),
        );
      }
    }
  }

  return packagesToBuild;
}

// Main function to start the build process
function buildDependencies(currentPackageDir) {
  // Get the package name from the `package.json` in the current package directory
  const packageJson = require(path.join(currentPackageDir, "package.json"));
  const packageName = packageJson.name;

  // Ensure that the current package is in the `@quoll/` namespace
  if (!packageName.startsWith("@quoll/")) {
    console.error(
      `Package ${packageName} is not in the @quoll/ namespace. Aborting.`,
    );
    process.exit(1);
  }

  const packagesToBuild = getDependenciesToBuild(packageName);

  // If no dependencies need building, we're done
  if (packagesToBuild.length === 0) {
    console.log(`No dependencies need to be built for ${packageName}`);
    return;
  }

  // Include the current package in the build list
  packagesToBuild.push(packageName);

  // Create the yarn workspaces foreach command
  const includeFlags = packagesToBuild
    .filter((pkg) => pkg !== packageName) // Exclude the current package
    .map((pkg) => `--include ${pkg}`)
    .join(" ");
  const excludeFlag = `--exclude ${packageName}`;
  const command = `yarn workspaces foreach -Rt ${includeFlags} ${excludeFlag} run build`;

  console.log(`Running command: ${command}`);

  // Run the command
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to build packages: ${error.message}`);
    process.exit(1);
  }
}

// Entry point
const currentPackageDir = process.cwd(); // Get the directory from which the script is executed

buildDependencies(currentPackageDir);
