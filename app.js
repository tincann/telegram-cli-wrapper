var tgapi = require('./lib/telegram-api.js').create();

tgapi.start(function(){
    setInterval(function(){
        tgapi.cli.writeLine('msg Mies ' + +new Date());
    }.bind(this), 5000);
});
