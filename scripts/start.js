const child_process = require("child_process");

module.exports = {
  start: (pkg) => {
    const args = ["start"];
    const opts = {
      stdio: "inherit",
      cwd: `packages/${pkg}`,
      shell: true,
    };

    child_process.spawn("yarn", args, opts);
  },
};
