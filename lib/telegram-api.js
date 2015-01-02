var net = require('net'),
    tgcli = require('./telegram-cli-wrapper.js'),
    config = require('./config.js'),
    util = require('util'),
    events = require('events'),
    parse = require('./utils/message-parser.js');


var TelegramAPI = function(){
    this.cli = null;
    this.connection = null;
}

TelegramAPI.prototype.connect = function(callback) {
    console.log('TelegramAPI::starting');
    if(tgcli.isRunning()){
        throw new Error('TelegramAPI is already running');
    }

    //Start telegram cli and connect to it using a socket
    tgcli.start(function(socket){
        this.connection = new Connection();
        this.cli = socket;

        //Make this the main session, so message come here
        this.cli.writeLine('main_session');

        //Get contactlist for username -> id mapping
        this.cli.writeLine('contact_list');

        this.cli.on('line', function(line){
            var message = parse(line);
            if(message){
                this.connection.emit('message', message);
            }
        }.bind(this));

        this.cli.on('error', function(e){
            console.log('TelegramAPI::error:', e);
            this.connection.emit('error', e);
        });

        this.cli.on('close', function(){
            console.log('TelegramAPI::close');
            this.connection.emit('close');
        });

        callback(this.connection);
    }.bind(this));
};

function Connection() { }
util.inherits(Connection, events.EventEmitter);

module.exports = new TelegramAPI();
