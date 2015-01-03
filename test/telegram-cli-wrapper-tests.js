var assert = require('assert'),
    tgcli = require('../lib/telegram-cli-wrapper.js');

describe('telegram-cli-wrapper', function() {    

    beforeEach(function(){
        tgcli.stop();
    });

    it('should not start the cli more than once', function(){
        tgcli.start(function(socket){
            assert.throws(function(done){
                tgcli.start(function(){
                    done();
                }); 
            }, /Process already started/);
        });
    });

    it('should correctly start and stop', function(done){
        tgcli.start(function(socket){
            tgcli.stop();
            done();
        });
    });

    it('should handle already stopped cli', function(){
        tgcli.stop();
    })

});