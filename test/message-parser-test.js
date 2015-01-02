var assert = require('assert'),
    util = require('util'),
    parse = require('../lib/utils/message-parser.js');

var messageType = {
    '>>>': 'outgoing',
    '<<<': 'incoming',
    '«««': 'incoming_history'
};

describe('utils', function(){
    describe('message-parser', function() {
        it('should correctly parse message', function(){
            var time = '19:16',
                peer = 'Peer',
                type = '«««',
                body = 'Body';

            var mString = constructMessageString(time, peer, type, body);
            var message = parse(mString);

            assert(message);
            assert.equal(message.time, time);
            assert.equal(message.peer, peer);
            assert.equal(message.type, messageType[type]);
            assert.equal(message.body, body);
        });

        it('should correctly parse message with space in peer name', function(){
            var time = '19:16',
                peer = 'Peer Name',
                type = '«««',
                body = 'Body';

            var mString = constructMessageString(time, peer, type, body);
            var message = parse(mString);

            assert(message);
            assert.equal(message.time, time);
            assert.equal(message.peer, peer);
            assert.equal(message.type, messageType[type]);
            assert.equal(message.body, body);
        });

        it('should correctly parse message types', function(){
            Object.keys(messageType).forEach(function(type){
                var mString = constructMessageString('00:00', 'Peer', type, 'Body');
                var message = parse(mString);

                assert(message);
                assert.equal(message.type, messageType[type]);
            });
        });
    })
});

function constructMessageString(time, peer, type, body) {
    return util.format('[%s]  %s %s %s', time, peer, type, body);
}

function assertMessage(){}