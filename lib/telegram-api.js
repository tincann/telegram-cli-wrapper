var net = require('net'),
    tgcli = require('./telegram-cli-wrapper.js'),
    config = require('./config.js'),
    util = require('util'),
    events = require('events');


var TelegramAPI = function(){
    this.cli = null;
}

util.inherits(TelegramAPI, events.EventEmitter);

TelegramAPI.prototype.start = function(callback) {
    console.log('TelegramAPI::starting');
    if(tgcli.isRunning()){
        throw new Error('TelegramAPI is already running');
    }

    //Start telegram cli and connect to it using a socket
    tgcli.start(function(socket){
        this.cli = socket;
        this.cli.writeLine('contact_list');
        this.cli.on('line', function(line){
            console.log(line);
        });

        this.cli.on('error', function(e){
            console.log('TelegramAPI::error:', e);
        });

        this.cli.on('close', function(){
            console.log('TelegramAPI::close');
        });

        callback();
    }.bind(this));

};

TelegramAPI.prototype.stop = function() {
    tgcli.stop();
};

module.exports = {
    create: function(){
        return new TelegramAPI();
    }
}
