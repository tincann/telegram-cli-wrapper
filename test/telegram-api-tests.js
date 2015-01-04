var assert = require('assert'),
    TelegramAPI = require('../lib/telegram-api.js');

describe('telegram-api', function() {
    it('should open new connection', function(done){
        TelegramAPI.connect(function(connection){
            assert(connection);
            TelegramAPI.disconnect();
            done();
        });
    }); 

    it('should emit error event from underlying socket', function(done){
        TelegramAPI.connect(function(connection){
            var socket = connection.socket;
            connection.on('error', function(){
                TelegramAPI.disconnect()
                done();
            });
            socket.emit('error');
        });
    });

    it('should emit close event from underlying socket', function(done){
        TelegramAPI.connect(function(connection){
            var socket = connection.socket;
            connection.on('close', function(){
                TelegramAPI.disconnect();
                done();
            });
            socket.emit('close');
        });
    });
});