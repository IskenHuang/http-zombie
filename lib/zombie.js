var Browser = require('zombie'),
    // assert = require('assert'),
    _ = require('underscore'),
    _config = require('./config');

module.exports = {
    init: function(params) {
        params = params || _config;
        _.extend(this, params);
        return this;
    },

    walking: function(params) {
        var _this = this;
        if(params){
            this.init(params);
        }

        setInterval(function() {
            if(_this.times > 0){
                _this.attack();
            }else{
                clearInterval(this);
                process.emit('exit');
            }
        }, _this.wait);

        return this;
    },

    attack: function(params) {
        params = params || _config;
        var _this = this;
        console.log('Zombie attack begin at',
                    'process[', _this.process, ']',
                    'times[', _this.times, ']',
                    'url[', _this.url, ']');

        console.log('------------------------ WEB CONSOLE BEGIN ------------------------------');
        Browser.visit(_this.url, function (e, browser) {
            console.log('------------------------ WEB CONSOLE END ------------------------------');
            _this.times--;
            console.log('Zombie attack end at ', new Date());
        });
    }
};
