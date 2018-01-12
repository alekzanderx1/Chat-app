var express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var usernames = {};

//to host static files to the html ie stylesheets and javascript
var path = require('path');
app.use(express.static(path.join(__dirname,'public')));

//responds to get request on port 300 by sending the index.html file as result
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//when connection to a socket is made by a client to the server
io.on('connection', function(socket){
	//take the username from client and store it for use
	socket.on('adduser', function(username){
		socket.username = username;
		usernames[username] = username;
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('user connected', socket.username + ' has connected',"");
	});
	
	//On receiving message from client forward it to all the clients including the sender
	socket.on('chat message', function(msg){
		io.emit('chat message', socket.username, msg);
	});
	
	//bradcast message when user disconnects
	socket.on('disconnect', function(){
		socket.broadcast.emit('user disconnected',socket.username+ ' has disconnected',"");
	});
});

//listening on port 3000
http.listen(port, function(){
  console.log('listening on *:3000');
});

    