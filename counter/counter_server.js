var http = require('http'),
sio = require('socket.io'),
fs = require('fs');

//1. Read html file
var sockFile = fs.readFileSync('counter_client.html');

//2. create the server
server = http.createServer();

//3. on(request)
server.on('request', function(req, res){
res.writeHead(200, {'content-type': 'text/html'});
res.end(sockFile);
});

//4. Listen to port
server.listen(8080);

//5. Let socket.io listen to server
var io = require('socket.io').listen(server);

var counter = 0;

//6. .on(connection) --> emit(server-emit) & on(client-emit)
io.sockets.on('connection', function (socket) {
	//6.1 emit(server_emit)
  socket.emit('server-emit', { current: counter++ });
   //6.2 on(client-emit)
  socket.on('client-emit', function (data) {
	socket.emit('server-emit', { current: counter++ });
  });
});