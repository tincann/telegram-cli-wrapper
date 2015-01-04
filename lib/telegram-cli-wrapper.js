var spawn = require('child_process').spawn,
    config = require('./config.js'),
    SocketWrapper = require('./utils/socket-wrapper.js'),
    net = require('net');


function TelegramCliWrapper(){
    this.childInstance = null;
    this.socket = null;
}

TelegramCliWrapper.prototype.start = function(callback){
    if(this.childInstance){
        throw new Error('Process already started');
    }

    var cli_path = config.get('telegram_cli_path'),
        publickey_path = config.get('server_publickey_path'),
        socket_path = generateSocketName(config.get('telegram_cli_socket_path'));

    //Start telegram-cli as child process listening on specified socket
    this.childInstance = spawn(
        cli_path, 
        ['-k', publickey_path, '-S', socket_path]);

    //Letting the cli spin up and create the socket
    setTimeout(function(){
        this.socket = net.createConnection(socket_path, function(){
            process.nextTick(function(){
                callback(new SocketWrapper(this.socket));
            }.bind(this));
        }.bind(this));
    }.bind(this), 30);
}

TelegramCliWrapper.prototype.stop = function(){
    if(this.socket && this.socket.writable){
        this.socket.write('quit\n');
    }

    if(this.childInstance){
        this.childInstance = null;
    }
}

TelegramCliWrapper.prototype.isRunning = function(){
    return !!this.childInstance;
}

//Generate unique socket name
function generateSocketName(path){
    return path + +new Date;
}

module.exports = TelegramCliWrapper;
