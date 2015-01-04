var assert = require('assert'),
    TelegramAPI = require('../lib/telegram-api.js');

describe('telegram-api', function() {

    afterEach(function(){
        TelegramAPI.disconnect();
    });

    it('should open new connection', function(done){
        TelegramAPI.connect(function(connection){
            assert(connection);
            done();
        });
    }); 

    it('should emit error event from underlying socket', function(done){
        TelegramAPI.connect(function(connection){
            var socket = connection.socket;
            connection.on('error', function(){
                
                done();
            });
            socket.emit('error');
        });
    });

    it('should emit disconnect event from underlying socket', function(done){
        TelegramAPI.connect(function(connection){
            var socket = connection.socket;
            connection.on('disconnect', function(){
                done();
            });
            TelegramAPI.disconnect();
        });
    });
});
