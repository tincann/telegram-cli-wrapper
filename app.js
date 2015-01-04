//This file is only used for debugging purposes -> Main file is lib/telegram-api.js

var TelegramAPI = require('./lib/telegram-api.js');

TelegramAPI.connect(function(connection){
    connection.on('message', function(message){
        console.log('message:', message);
    });

    setInterval(function(){
        connection.send('Mies', 'hallo ' + new Date);        
    }, 5000);

    connection.on('error', function(e){
        console.log('Error from Telegram API:', e);
    });

    connection.on('disconnect', function(){
        console.log('Disconnected from Telegram API');
    });
});
