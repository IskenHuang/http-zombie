var _ = require('underscore'),
    _config = require('./config'),
    _fork = require('./cmdFork'),
    Zombie = require('./zombie'),
    Process = _fork('process');

module.exports = {
    getDefaults: function() {
        return _config;
    },

    zombieWalking: function(params) {
        console.log('processHandler zombieWalking params = ', params);
        Zombie.walking(params);
    },

    init: function(argv) {
        argv = argv || process.argv;
        console.log('processHandler init argv = ', argv);
        var cmds = argv.slice(2, argv.length);

        _.extend(this, this.getDefaults());

        if(cmds.length) {
            for(var i = 0; i < cmds.length; i+=2) {
                var c = cmds.slice(i, i +2),
                    _key = c[0].toLowerCase();
                if(c.length === 2) {
                    console.log('c = ', c);
                    this[this.hash[_key]] = c[1];
                }else{
                    if(c.length === 1 && _key === '-a' || _key === '--attack') {
                        this[this.hash[c[0]]] = true;
                    }
                }
            }
        }

        var sendObj = this;
        delete sendObj.init;
        delete sendObj.hash;
        delete sendObj.getDefaults;
        sendObj.process = parseInt(sendObj.process, 10);
        sendObj.times = parseInt(sendObj.times, 10);
        sendObj.wait = parseInt(sendObj.wait, 10);
        sendObj.isAttack = Boolean(sendObj.isAttack);
        Process.send(sendObj);

        return this;
    },

    hash: {
        '--times': 'times',
        '-t': 'times',
        '-process': 'process',
        '-p': 'process',
        '--url': 'url',
        '-u': 'url',
        '--wait': 'wait',
        '-w': 'wait',
        '--attack': 'isAttack',
        '-a': 'isAttack'
    }
};
