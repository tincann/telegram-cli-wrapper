var assert = require('assert'),
    util = require('util'),
    parse = require('../../lib/utils/message-parser.js');

var messageType = {
    '>>>': 'outgoing',
    '<<<': 'incoming',
    '«««': 'incoming_history'
};


var messageTypeInv = {
    'outgoing': '>>>',
    'incoming': '<<<',
    'incoming_history': '«««'
};

describe('utils', function(){
    describe('message-parser', function() {
        it('should correctly parse message', function(){
            var expected = { 
                time: '19:16',
                peer: 'Peer Name',
                type: 'incoming_history',
                body: 'Body'
            };

            var mString = constructMessageString(expected);
            var actual = parse(mString);

            assert(actual);
            assert.deepEqual(actual, expected);
        });

        it('should correctly parse message with space in peer name', function(){
            var expected = { 
                time: '19:16',
                peer: 'Peer Name',
                type: 'incoming_history',
                body: 'Body'
            };

            var mString = constructMessageString(expected);
            var actual = parse(mString);

            assert(actual);
            assert.deepEqual(actual, expected);
        });

        it('should correctly parse message types', function(){
            Object.keys(messageTypeInv).forEach(function(type){
                var expected = {
                    time: '00:00', 
                    peer: 'Peer', 
                    type: type, 
                    body: 'Body'
                };

                var mString = constructMessageString(expected);
                var actual = parse(mString);

                assert(actual);
                assert.equal(actual.type, type);
            });
        });
    })
});

function constructMessageString(m) {
    return util.format('[%s]  %s %s %s', m.time, m.peer, messageTypeInv[m.type], m.body);
}
