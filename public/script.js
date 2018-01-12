$(function () {
	var socket = io();
	socket.on('connect', function(){
		socket.emit('adduser', prompt("What's your name?"));
	});
	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
    });
	socket.on('chat message', function(username,data){
		$('#messages').append('<li><b>'+username + ':</b> ' + data+'</li>');
    });
	socket.on('user connected',function(username,data){
		$('#messages').append('<li><b>'+username + '!</b> ' + data+'</li>');
    });
	socket.on('user disconnected',function(username,data){
		$('#messages').append('<li><b>'+username + '!</b> ' + data+'</li>');
    });
 });