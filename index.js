var express = require('express');
var socket = require('socket.io');


// App setup
var app = express();
var server = app.listen(4000, function () {
    console.log('listening to request on port 4000');
});


// Static file
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection', function( socket ) {
    console.log('connection made socket', socket.id);

    // Handle chat event
    socket.on('chat', function( data ){
        io.sockets.emit('chat', data);
    });

    // emit event for everyone but not for that socket 
    socket.on('typing', function (data ) {
        socket.broadcast.emit('typing', data);
    })


});


io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});






