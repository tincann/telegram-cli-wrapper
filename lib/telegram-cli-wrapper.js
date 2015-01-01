var childProcess = require('child_process'),
	config = require('./config.js'),
	net = require('net');

var childInstance = null;

exports.start = function(){
	console.log('telegram-cli-wrapper::starting');
	if(childInstance){
		throw new Error('Process already started');
	}

	var cli_path = config.get('telegram_cli_path'),
		publickey_path = config.get('server_publickey_path'),
		socket_path = config.get('telegram_cli_socket_path');

	//Start telegram-cli as child process listening on specified port
	childInstance = childProcess.spawn(
		cli_path, 
		['-k', publickey_path, '-S', socket_path]);

	return createSocket(socket_path);
}

function createSocket(socket_path){
	var socket = net.createConnection(socket_path, function(){
		console.log('telegram-cli-wrapper::connected to socket', socket_path);
		socket.setEncoding('utf8');
		socket.write('main_session\n');
		setInterval(function(){
			socket.write('msg Mies test\n');
		}, 2000);
	});

	socket.on('error', function(e){
		throw new Error(e);
	});

	socket.on('close', function(){
		console.log('telegram-cli-wrapper::socket closed');
	});

	return socket;
}

exports.stop = function(){
	console.log('telegram-cli-wrapper::stopping');
	if(childInstance){
		childInstance.kill('SIGSTOP');
		childInstance = null;
	}
}

exports.isRunning = function(){
	return !!childInstance;
}