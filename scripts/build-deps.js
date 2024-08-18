#!/usr/bin/env node

// Run this script in a package directory and it will build all the
// dependencies, which have not already been built. It is useful during local
// development when you want to build only the dependencies of a package and
// not the entire monorepo.

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const NPM_SCOPE = "@quoll";

// Set up the base directory (root of the monorepo)
const rootDir = path.resolve(__dirname, ".."); // Go up one level from `scripts/`

// Helper function to check if a package is part of the workspace.
// Ideally this would do an actual file and package name check but this is
// good enough for now.
function isWorkspacePackage(packageName) {
  return packageName.startsWith(NPM_SCOPE);
}

// Helper function to get the path to a package's directory
function getWorkspacePackageDir(packageName) {
  if (!isWorkspacePackage(packageName)) {
    throw new Error(`Package ${packageName} is not in the workspace.`);
  }

  return path.join(
    rootDir,
    "packages",
    packageName.replace(`${NPM_SCOPE}/`, ""),
  );
}

// Helper function to resolve the path to a package's `package.json`
function getPackageJson(packageName) {
  const packageDir = getWorkspacePackageDir(packageName);
  return require(path.join(packageDir, "package.json"));
}

// Helper function to check if a package has been built (i.e., if the `dist` folder exists)
function isPackageBuilt(packageName) {
  const packageDir = getWorkspacePackageDir(packageName);
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
      !isWorkspacePackage(depName) ||
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

function buildDependencies() {
  // Start at the package from which the script is run
  const packageDir = process.cwd();
  const packageJson = require(path.join(packageDir, "package.json"));
  const packageName = packageJson.name;

  if (!isWorkspacePackage(packageName)) {
    console.error(`Package ${packageName} is not in the workspace. Aborting.`);
    process.exit(1);
  }

  const packagesToBuild = getDependenciesToBuild(packageName);

  if (packagesToBuild.length === 0) return;

  // Create the yarn workspaces foreach command
  const includeFlags = packagesToBuild
    .map((pkg) => `--include ${pkg}`)
    .join(" ");
  const command = [
    "yarn workspaces foreach",
    "-Rt", // Run in topological order
    includeFlags,
    "run build",
  ].join(" ");

  try {
    console.log("Building dependencies...");
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to build packages: ${error.message}`);
    process.exit(1);
  }
}

buildDependencies();
