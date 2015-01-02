var childProcess = require('child_process'),
    config = require('./config.js'),
    SocketWrapper = require('./utils/socket-wrapper.js'),
    net = require('net');

var childInstance = null;

exports.start = function(callback){
    console.log('telegram-cli-wrapper::starting');
    if(childInstance){
        throw new Error('Process already started');
    }

    var cli_path = config.get('telegram_cli_path'),
        publickey_path = config.get('server_publickey_path'),
        socket_path = config.get('telegram_cli_socket_path');

    //Start telegram-cli as child process listening on specified socket
    childInstance = childProcess.spawn(
        cli_path, 
        ['-k', publickey_path, '-S', socket_path]);

    var socket = net.createConnection(socket_path, function(){
        console.log('telegram-cli-wrapper::connected to socket', socket_path); 
        callback(new SocketWrapper(socket));
    });
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
