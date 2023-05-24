const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const Chat = require('./models/chat');
const PORT = 3000 || process.env.PORT;
const connect = require('./config/database-config')

io.on('connection', (socket)=> {
    // console.log("a user is connected", socket.id);

    socket.on('join_room', (data)=>{
        console.log("joining room", data.roomid);
        socket.join(data.roomid)
    })

    socket.on('new_msg', async(data)=>{
        console.log(data);
        const chat = await Chat.create({
            roomid:data.roomid,
            content: data.msg,
            user: data.username
        })
        io.to(data.roomid).emit('msg_rcvd' , data)
    })

    socket.on('typing', (data)=>{
        socket.broadcast.to(data.roomid).emit('someone_typing');
    })
})
app.set('view engine', 'ejs')
app.use('/', express.static(__dirname + '/public'))

app.get('/chat/:roomid', async(req,res)=>{
    const chats = await Chat.find({
        roomid: req.params.roomid
    }).select('content user')
    res.render('index', {
        name:'sanket',
        id:req.params.roomid,
        chats: chats
    })
})



server.listen(PORT, async ()=>{
    console.log("server connected at ", 3000);
    await connect();
    console.log("mongodb connected");

    
})