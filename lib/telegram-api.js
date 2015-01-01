var net = require('net'),
	tgcli = require('./telegram-cli-wrapper.js'),
	StreamReader = require('./utils/socket-wrapper.js'),
	config = require('./config.js'),
	util = require('util'),
	events = require('events');


var TelegramAPI = function(){
	this.cli = null;
}

util.inherits(TelegramAPI, events.EventEmitter);

TelegramAPI.prototype.start = function() {
	console.log('TelegramAPI::starting');
	if(tgcli.isRunning()){
		throw new Error('TelegramAPI is already running');
	}

	//Start telegram cli and connect to it using a socket
	var socket = tgcli.start();
	this.cli = new StreamReader(socket);
	this.cli.on('line', function(line){
		console.log(line);
	});

	this.cli.on('error', function(e){
		console.log('TelegramAPI::error:', e);
	});

	this.cli.on('close', function(){
		console.log('TelegramAPI::close');
	});
};

TelegramAPI.prototype.stop = function() {
	tgcli.stop();
};

module.exports = {
	create: function(){
		return new TelegramAPI();
	}
}