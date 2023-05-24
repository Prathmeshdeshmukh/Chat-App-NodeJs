var socket = io();

var button = document.getElementById('btn');
var username = document.getElementById('userId').value;
let roomid = document.getElementById('roomId').value;

button.onclick = ()=>{
    // console.log(roomid);
    var spanTag = document.getElementById('val');
    spanTag.innerText= roomid;
}


