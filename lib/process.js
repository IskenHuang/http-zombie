var _ = require('underscore'),
    ThreadHandler = require('./threadHandler'),
    ProcessHandler = require('./processHandler');

process.on( 'message', function(msg){
    console.log('process msg :: CMD = ', msg);
    if(_.isArray(msg) && msg[0] === 'node'){
        ProcessHandler.init(msg);
    }else if(_.isObject(msg)){
        if(msg.isAttack){
            ProcessHandler.zombieWalking(msg);
        }else{
            ThreadHandler.newThreadAll(msg);
        }
    }
});

process.on('exit', function() {
    console.log('-------------------------- exit --------------------------');
    this.kill('SIGTERM');
});

process.on('error', function() {
    console.log('-------------------------- error --------------------------');
});

process.on('SIGINT', function() {
    console.log('-------------------------- SIGINT --------------------------');
    process.exit(0);
});

process.on('SIGTERM', function() {
    console.log('-------------------------- SIGTERM --------------------------');
    process.exit(0);
});
