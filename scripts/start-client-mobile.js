const args = ["start"];
const opts = { stdio: "inherit", cwd: "packages/client-mobile", shell: true };
require("child_process").spawn("yarn", args, opts);
