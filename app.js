var tgapi = require('./lib/telegram-api.js');

tgapi.connect(function(connection){
    connection.on('message', function(message){
        console.log('message:', message);
    });
});
