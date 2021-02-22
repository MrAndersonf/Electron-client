const cp = require('child_process')


module.exports = (exct) => {
  let processIdentification = cp.spawn('node', [`${exct}`], {
    function(code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
    }
  });

  processIdentification.stdout.on("data", function(data) {
    console.log(data)
  })

  processIdentification.stdout.pipe(process.stdout)

  processIdentification.stdout.on("message", function(data) {
    console.log(data)
  })

  processIdentification.stdout.on("exit", function(data) {
    console.log(data)
  })
}