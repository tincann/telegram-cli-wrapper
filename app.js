var tgapi = require('./lib/telegram-api.js');

tgapi.connect(function(connection){
    // setInterval(function(){
    //     tgapi.cli.writeLine('msg Mies ' + +new Date());
    // }.bind(this), 5000);
    connection.on('message', function(message){
        console.log('message:', message);
    });
});
