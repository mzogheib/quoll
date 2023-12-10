require('dotenv').config();
const { spawn } = require('child_process');

const { CHROMATIC_PROJECT_TOKEN } = process.env;
const opts = { stdio: 'inherit', shell: true };

spawn(
  `npx chromatic --project-token=${CHROMATIC_PROJECT_TOKEN} --auto-accept-changes`,
  opts
);
