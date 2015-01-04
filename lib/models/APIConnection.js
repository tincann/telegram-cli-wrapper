var util = require('util'),
    events = require('events'),
    parse = require('../utils/message-parser.js');

function APIConnection(socket) {
    this.socket = socket;
    registerEvents.call(this, socket);
    this.open = true;
}

util.inherits(APIConnection, events.EventEmitter);

APIConnection.prototype.send = function(peer, message) {
    if(this.open){
        var command = util.format('msg %s %s', peer, message);
        this.socket.writeLine(command);
    }else{
        throw new Error('API connection closed');
    }
};

APIConnection.prototype.close = function() {
    this.open = false;
    this.socket.end();
};

var registerEvents = function(socket) {
    socket.on('line', function(line){
        var message = parse(line);
        if(message){
            this.emit('message', message);
        }
    }.bind(this));

    socket.on('error', function(e){
        this.emit('error', e);
    }.bind(this));

    socket.on('close', function(){
        this.emit('close');
    }.bind(this));
};

module.exports = APIConnection;
