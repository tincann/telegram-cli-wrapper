//This file is only used for debugging purposes -> Main file is lib/telegram-api.js

var tgapi = require('./lib/telegram-api.js');

tgapi.connect(function(connection){
    connection.on('message', function(message){
        console.log('message:', message);
    });
});
