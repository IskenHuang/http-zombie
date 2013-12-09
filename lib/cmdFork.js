var child = require('child_process');

module.exports = function(cmd) {
    return child.fork( __dirname + '/' + cmd);
};
