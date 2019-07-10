const args = ['start']
const opts = { stdio: 'inherit', cwd: 'packages/api', shell: true }
require('child_process').spawn('yarn', args, opts)
