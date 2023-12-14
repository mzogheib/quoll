const child_process = require("child_process");

const PACKAGES = ["api", "client-mobile", "client-web", "ui-components"];

if (process.argv.length <= 2) {
  console.error(
    "Error: Must specify the package to run, e.g. 'node start.js api'.",
  );
  process.exit(1);
}

const pkg = process.argv[2];

if (!PACKAGES.includes(pkg)) {
  console.error(
    `Error: Unknown package '${pkg}'. Known packages are [${PACKAGES.join(
      ", ",
    )}].`,
  );
  process.exit(1);
}

const opts = {
  stdio: "inherit",
  cwd: `packages/${pkg}`,
  shell: true,
};

child_process.spawn("yarn", ["start"], opts);
