const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user:{
        type: String
    },
    content: {
        type: String
    },
    roomid:{
        type: String
    }
}) 

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;