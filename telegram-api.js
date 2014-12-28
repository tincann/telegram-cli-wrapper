var net = require('net'),
	util = require('util'),
	events = require('events'),
	tgcli = require('./telegram-cli-wrapper.js');

var socket = net.Socket();

var TelegramAPI = function(){
	
}

util.inherits(TelegramAPI, events.EventEmitter);

TelegramAPI.prototype.start = function(callback) {
	if(tgcli.isRunning()){
		throw new Error('TelegramAPI is already running');
	}

	var self = this;
	//Start telegram cli and connect to it using sockets
	tgcli.start(function(port){
		socket.connect(port, '127.0.0.1', function(){
			console.log('connected');
			socket.write('msg Morten hallo\n');

		});
	});
};

TelegramAPI.prototype.stop = function() {
	tgcli.stop();
};

var buffer = '';
socket.setEncoding('utf8');
socket.on('data', function(data){
	console.log(data);
	buffer += data;
	while((i = buffer.indexOf('\n'))){
		socket.emit('line', buffer.substr(0, i));
		buffer = buffer.substr(i + 1);
	}
});

socket.on('line', function(line){
	console.log(line);
});

socket.on('error', function(e){
	throw e;
});

socket.on('close', function(){
	console.log('connection to cli closed');
})

module.exports = {
	create: function(){
		return new TelegramAPI();
	}
}