var socket = io();

let button = document.getElementById('btn');

button.onclick = function excec(){
    socket.emit('From_Client');
}


socket.on('From_server', ()=>{
    console.log('from_server')
    const div = document.createElement('div');
    div.innerText = 'new event from server';
    document.body.appendChild(div);
})