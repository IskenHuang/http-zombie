var spawnOptions = {
        stdio: [ 'ipc' ]
    },
    spawn = require('child_process').spawn;

// child = child_process.spawn 'coffee', ['./child.coffee'], spawnOptions
// spawnOptions is for coffee todo child_process fork

module.exports = function(cmd) {
    var splitCmdArray = cmd.split(/ /ig),
        childProcess = spawn(splitCmdArray[0], splitCmdArray.slice( 1, splitCmdArray.length), spawnOptions);

    childProcess.on('close', function() {
        console.log('CMD :: [', cmd, '] is close');
    });

    return childProcess;
};
