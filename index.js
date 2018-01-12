var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//responds to get request on port 300 by sending the index.html file as result
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//controls connection by different users on port 3000
io.on('connection', function(socket){
	console.log('a user connected');
	//function when user disconnects ie closes the window or tab
	socket.on('disconnect', function(){
		console.log('user disconnected');
});

//listening on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
    