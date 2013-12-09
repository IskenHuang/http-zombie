var fork = require('child_process').fork,
    Process = fork(  __dirname + '/lib/process');

Process.send(process.argv);
