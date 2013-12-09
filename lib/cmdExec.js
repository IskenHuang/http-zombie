var sys = require('sys'),
    exec = require('child_process').exec;

module.exports = function(cmd) {
    var _this = this;
    cmd = cmd || '';
    console.log('CMD :: ', cmd);
    exec( cmd, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
            console.log('exec error: ' + error);
        }

        return _this;
    });
};
