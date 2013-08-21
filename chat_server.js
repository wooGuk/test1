var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')


  app.listen(8005);

function handler(req, res){
	fs.readFile(__dirname +'/chat.html',
		function (err, data){
		if(err)
		{
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	});
}
//hihihi!
io.sockets.on('connection', function(socket) {
	var room_name = null;

	socket.on('set_room', function(data){
		socket.join(data.room_name);
		this.room_name = data.room_name;
	});
	socket.on('my other event', function(data){
		socket.emit("my_message",data); // 나한테
		if(this.room_name!=null){
			socket.broadcast.to(this.room_name).emit("message",data); // 연결된 사람한테
		}
	});
	socket.on('paint event', function(data){
		if(this.room_name!=null){
			socket.broadcast.to(this.room_name).emit("draw",data); // 연결된 사람한테
		}
	});
});