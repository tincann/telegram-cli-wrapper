var assert = require('assert'),
    TelegramAPI = require('../lib/telegram-api.js');

describe('telegram-api', function() {
    it('should open new connection', function(done){
        var api = new TelegramAPI; 
        api.connect(function(connection){
            assert(connection);
            done();
        });
    }); 

    it('should emit error event from underlying socket', function(done){
        var api = new TelegramAPI;
        api.connect(function(connection){
            var socket = connection.socket;
            connection.on('error', function(){
                done();
            });
            socket.emit('error');
        });
    });

    it('should emit close event from underlying socket', function(done){
        var api = new TelegramAPI;
        api.connect(function(connection){
            var socket = connection.socket;
            connection.on('close', function(){
                done();
            });
            socket.emit('close');
        });
    });
});