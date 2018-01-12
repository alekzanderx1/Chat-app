var express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//to host static files to the html ie stylesheets and javascript
var path = require('path');
app.use(express.static(path.join(__dirname,'public')));

//responds to get request on port 300 by sending the index.html file as result
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//io socket which on receiving chat message event on server emits chat message event to clients with the message data
io.on('connection', function(socket){
	 socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
	
});

//listening on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});

/*console.log('a user connected');
	socket.on('chat message', function(msg){
    console.log('message: ' + msg);
	//function when user disconnects ie closes the window or tab
	socket.on('disconnect', function(){
		console.log('user disconnected');*/
    