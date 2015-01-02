var assert = require('assert'),
    SocketWrapper = require('../../lib/utils/socket-wrapper.js'),
    net = require('net');


describe('utils', function(){
    describe('socket-wrapper', function(){
        it('should emit line event', function(done){
            var socket = new net.Socket();
            var sw = new SocketWrapper(socket);

            sw.on('line', function(line){
                done();
            });

            socket.emit('data', 'Testing a line\n');
        });

        it('should emit multiple line events', function(done){
            var socket = new net.Socket();
            var sw = new SocketWrapper(socket);
            
            var count = 0;

            sw.on('line', function(line){
                if(++count === 3){
                    done();
                }
            });

            socket.emit('data', 'One\nTwo\nThree\n');
        });

        it('should buffer incomplete data', function(done){
            var socket = new net.Socket();
            var sw = new SocketWrapper(socket);
            
            var expected = 'This is a full sentence.\n';

            sw.on('line', function(actual){
                assert(actual, expected);
                done();
            });

            socket.emit('data', 'This is');            
            socket.emit('data', ' a full sen');
            socket.emit('data', 'tence.\n');
        });

        it('should not emit a line event for empty lines', function(done){
            var socket = new net.Socket();
            var sw = new SocketWrapper(socket);
            
            var count = 0;
            sw.on('line', function(line){
                if(!line){
                    assert.fail('line shouldn\'t be empty');
                }

                if(++count == 2){
                    done();
                }
            });

            socket.emit('data', '\nOne\n\nTwo\n\n\n');
        });

        it('should emit error event from underlying socket', function(done){
            var socket = new net.Socket();
            var sw = new SocketWrapper(socket);
            
            var expectedError = 'error';

            sw.on('error', function(actualError){
                assert(actualError);
                assert.equal(actualError, expectedError);
                done();
            });

            socket.emit('error', expectedError);
        });

        it('should emit close event from underlying socket', function(done){
            var socket = new net.Socket();
            var sw = new SocketWrapper(socket);
            
            sw.on('close', function(){
                done();
            });

            socket.emit('close');
        });
    });
});