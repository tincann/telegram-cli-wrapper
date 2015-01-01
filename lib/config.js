var config = { 
    telegram_cli_path: './tg/bin/telegram-cli',
    telegram_cli_socket_path: './socket',
    server_publickey_path: './tg/server.pub',
};

exports.get = function(key){
    var value;
    if((value = config[key]) !== undefined){
        return value;
    }

    throw new Error('Key ' + key + ' not defined');
}
