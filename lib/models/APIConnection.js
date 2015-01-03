var util = require('util'),
    events = require('events'),
    parse = require('../utils/message-parser.js');

function APIConnection(socket) {
    this.socket = socket;
    registerEvents.call(this, socket);
}

util.inherits(APIConnection, events.EventEmitter);

APIConnection.prototype.send = function(peer, message) {
    var command = util.format('%s %s', peer, message);
    this.socket.writeLine(command);
};

var registerEvents = function(socket) {
    socket.on('line', function(line){
        var message = parse(line);
        if(message){
            this.emit('message', message);
        }
    }.bind(this));

    socket.on('error', function(e){
        console.log('APIConnection::error:', e);
        this.emit('error', e);
    }.bind(this));

    socket.on('close', function(){
        console.log('APIConnection::close');
        this.emit('close');
    }.bind(this));
};

module.exports = APIConnection;
