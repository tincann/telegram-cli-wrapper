var spawn = require('child_process').spawn,
    config = require('./config.js'),
    SocketWrapper = require('./utils/socket-wrapper.js'),
    net = require('net');

var childInstance = null,
    socket = null;

exports.start = function(callback){
    console.log('telegram-cli-wrapper::starting');
    if(childInstance){
        throw new Error('Process already started');
    }

    var cli_path = config.get('telegram_cli_path'),
        publickey_path = config.get('server_publickey_path'),
        socket_path = generateSocketName(config.get('telegram_cli_socket_path'));

    //Start telegram-cli as child process listening on specified socket
    childInstance = spawn(
        cli_path, 
        ['-k', publickey_path, '-S', socket_path]);

    //Letting the cli spin up and create the socket
    setTimeout(function(){
        socket = net.createConnection(socket_path, function(){
            process.nextTick(function(){
                callback(new SocketWrapper(socket));
            });
        });
    }, 10);
}

//Generate unique socket name
function generateSocketName(path){
    return path + +new Date;
}

exports.stop = function(){
    if(socket && socket.writable){
        socket.write('quit\n');
    }

    // console.log('telegram-cli-wrapper::stopping');
    if(childInstance){
        childInstance = null;
    }
}

exports.isRunning = function(){
    return !!childInstance;
}
