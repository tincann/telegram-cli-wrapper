var assert = require('assert'),
    TelegramCliWrapper = require('../lib/telegram-cli-wrapper.js');

describe('telegram-cli-wrapper', function() {

    this.timeout(5000);

    it('should not start the cli more than once', function(){
        var cli = new TelegramCliWrapper();
        cli.start(function(socket){
            assert.throws(function(done){
                cli.start(function(){
                    done();
                }); 
            }, /Process already started/);
        });
    });

    it('should correctly start and stop', function(done){
        var cli = new TelegramCliWrapper();
        cli.start(function(socket){
            cli.stop();
            done();
        });
    });

    it('should handle already stopped cli', function(){
        var cli = new TelegramCliWrapper();
        cli.stop();
    });
});