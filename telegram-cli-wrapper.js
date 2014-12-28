var childProcess = require('child_process'),
	config = require('./config.js'),
	ps = require('./port-selector.js'),
	async = require('async');

var childProcess = null;

exports.start = function(startCallback){
	if(childProcess){
		throw new Error('Process already started');
	}
	//Get unused port
	ps.getPort(function(port){
		console.log('starting tgcli on port', port);
		//Start telegram-cli as child process listening on specified port
		childProcess = child.spawn(config.telegram_cli_path, ['-k', config.server_publickey_path, '-P', port]);
		startCallback(port);
	});
}

export.stop = function(callback){
	if(childProcess){
		childProcess.kill('SIGSTOP');
		childProcess = null;
	}
}