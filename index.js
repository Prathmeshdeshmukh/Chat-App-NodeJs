const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);


io.on('connection', (socket)=> {
    console.log("a user is connected", socket.id);

    setInterval(()=>{
        socket.emit('From_server');
    }, 10000);

    socket.on('From_Client', ()=>{
        console.log('received msg from client')
    })
})
app.use('/', express.static(__dirname + '/public'))



server.listen(3000, ()=>{
    console.log("server connected at ", 3000);

    
})