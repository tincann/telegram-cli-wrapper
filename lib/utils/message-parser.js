// message types:
// >>> - outgoing message
// <<< - incoming message
// ««« - incoming message (from history)

var messageType = {
    '>>>': 'outgoing',
    '<<<': 'incoming',
    '«««': 'incoming_history'
};

var messagePattern = /^\[(.*?)\]\s{2}(.*?)\s(>>>|<<<|«««)\s(.+?)$/;
var parseMessage = function(string){
    var result = messagePattern.exec(string);
    //console.log(result);
    if(!result) return false;

    return {
        time: result[1],
        peer: result[2],
        type: messageType[result[3]],
        body: result[4] 
    };
};

module.exports = parseMessage;
