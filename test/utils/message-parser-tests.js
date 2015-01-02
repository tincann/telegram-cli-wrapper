var assert = require('assert'),
    Message = require('../../lib/models/Message.js'),
    parse = require('../../lib/utils/message-parser.js'),
    util = require('util');

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
            var expected = new Message(
                '19:16', 'Peer', 'incoming_history', 'Body');

            var mString = constructMessageString(expected);
            var actual = parse(mString);

            assert(actual);
            assert.deepEqual(actual, expected);
        });

        it('should correctly parse message with space in peer name', function(){
            var expected = new Message(
                '19:16', 'Peer Name', 'incoming_history', 'Body');

            var mString = constructMessageString(expected);
            var actual = parse(mString);

            assert(actual);
            assert.deepEqual(actual, expected);
        });

        it('should correctly parse message types', function(){
            Object.keys(messageTypeInv).forEach(function(type){
                var expected = new Message(
                    '19:16', 'Peer Name', type, 'Body');

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
