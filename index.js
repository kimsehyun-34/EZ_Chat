const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = app.listen(8080, '0.0.0.0', () => {
    console.log('실행: http://localhost:8080');
});
const io = socketIo(server);

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

io.on('connection', (socket) => {
    console.log('사용자 연결됨');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('사용자 연결 끊김');
    });
});
