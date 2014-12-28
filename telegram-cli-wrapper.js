var childProcess = require('child_process'),
	config = require('./config.js'),
	ps = require('./port-selector.js'),
	async = require('async');

var childInstance = null;

exports.start = function(startCallback){
	if(childInstance){
		throw new Error('Process already started');
	}
	//Get unused port
	ps.getPort(function(port){
		console.log('starting tgcli on port', port, 'path', config.telegram_cli_path);
		//Start telegram-cli as child process listening on specified port
		childInstance = childProcess.spawn(config.telegram_cli_path, ['-k', config.server_publickey_path, '-P', port]);
		startCallback(port);
	});
}

exports.stop = function(){
	if(childInstance){
		childInstance.kill('SIGSTOP');
		childInstance = null;
	}
}

exports.isRunning = function(){
	return !!childInstance;
}