var net = require('net');
var portrange = 45032
 
//Gets random unused port
//https://gist.github.com/mikeal/1840641
var getPort = function(cb) {
  var port = portrange;
  portrange += 1;
 
  var server = net.createServer();
  server.listen(port, function (err) {
    server.once('close', function () {
      cb(port);
    })
    server.close();
  })
  server.on('error', function (err) {
    getPort(cb);
  })
}

exports.getPort = getPort;