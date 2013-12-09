var _config = require('./config'),
    _exec = require('./cmdExec');

module.exports = {
    newThread: function(params){
        params = params || _config;
        console.log('ThreadHandler newThread params = ', params);
        _exec('node app -t ' + params.times + ' -p ' + params.process + ' -w ' + params.wait + ' -a');
    },

    newThreadAll: function(params){
        params = params || _config;
        console.log('ThreadHandler newThreadAll params = ', params);
        var _this = this,
            processCount = params.process;
        for (var i = 0; i < processCount; i++) {
            params.process = i + 1;
            _this.newThread(params);
        }
    },

    stopThreadAll: function() {
        console.log('ThreadHandler stopThreadAll');
        process.exit(0);
    },
};
