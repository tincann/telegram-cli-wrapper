var assert = require('assert'),
    tgcli = require('../lib/telegram-cli-wrapper.js');

describe('telegram-cli-wrapper', function() {
    afterEach(function(){
        tgcli.stop();
    });

    it('should not start the cli more than once', function(){
        tgcli.start(function(socket){
            assert.throws(function(){
                tgcli.start(); 
            }, /Process already started/);
        });
    });

    it('should correctly start and stop', function(){
        tgcli.start(function(socket){
            tgcli.stop();
        });
    });
});