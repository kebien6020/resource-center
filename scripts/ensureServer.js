const tcpPortUsed = require('tcp-port-used')
const { exec } = require('child_process')

Promise.all([
  tcpPortUsed.check(3000, '127.0.0.1'),
  tcpPortUsed.check(9000, '127.0.0.1')
]).then(([startedDev, startedServer]) => {
  if (startedDev && startedServer) {
    process.exit(0)
  } else if (!startedDev && !startedServer) {
    exec('npm start')
  } else {
    console.error('Only one server is running, testing requires both')
    process.exit(1)
  }
})
